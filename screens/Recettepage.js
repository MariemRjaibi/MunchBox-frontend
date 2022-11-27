import { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import SwitchSelector from "react-native-switch-selector";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import favorites, {
  addFavorites,
  removeAllFavorites,
  removeFavorites,
} from "../reducers/favorites";
import { logout } from "../reducers/users";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import ConceptScreen from "./form/ConceptScreen";
import SignupScreen from "./SignupScreen";
import SigninScreen from "./SigninScreen";
//import { APIKEY } from "react-native-dotenv";

export default function Recettepage({ navigation }) {
  // ======= Bouton retour  =======//
  const goBack = () => {
    navigation.goBack();
  };
  // const API_KEY = process.env.API_KEY;

  const [listRecipe, setListRecipe] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [displayedSteps, setDisplayedSteps] = useState([]);

  const [noResult, setNoResult] = useState(false);
  //const [apikey, setApiKey] = useState("");

  const user = useSelector((state) => state.users.value.token);
  const isFiltered = useSelector((state) => state.choosePaths.value);
  const ingredientsFromFilter = useSelector(
    (state) => state.placardIngredients.value
  );
  const dispatch = useDispatch();
  function handleFilter() {
    navigation.navigate(Filter);
  }
  const handleLogOut = () => {
    dispatch(logout());
    navigation.navigate(SigninScreen);
  };

  useEffect(() => {
    // const _clearAll = async () => {
    //   try {
    //     await AsyncStorage.clear();
    //     console.log("Done");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // _clearAll();

    //structure of filter string on api

    let newIngApi = "";
    for (let i = 0; i < ingredientsFromFilter.length; i++) {
 
      newIngApi += `${ingredientsFromFilter[i].toLowerCase()}+,`;

    }
   // console.log("isFiltered", isFiltered);
    let apiUrl = "";
    //select which api key choose
    if (isFiltered) {
      apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=c2766ffb9a9f4f0d9b5306cbd219822c&number&number=40&tags=${newIngApi}`;
    } else {
      apiUrl =
        "https://api.spoonacular.com/recipes/random?apiKey=c2766ffb9a9f4f0d9b5306cbd219822c&number=40";
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.recipes.length === 0) {
          setNoResult(true);
        } else {
          setNoResult(false);
          setListRecipe(data.recipes);
        }
      });
  }, []);

  // handle filters

  function handlePressStarter() {
    fetch(
      "https://api.spoonacular.com/recipes/random?apiKey=c2766ffb9a9f4f0d9b5306cbd219822c&number=40&tags=starter"
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setListRecipe(data.recipes);
      });
  }

  function handlePressMainCourse() {
    fetch(
      "https://api.spoonacular.com/recipes/random?apiKey=c2766ffb9a9f4f0d9b5306cbd219822c&number=40&tags=lunch"
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setListRecipe(data.recipes);
      });
  }

  function handlePressDessert() {
    fetch(
      "https://api.spoonacular.com/recipes/random?apiKey=c2766ffb9a9f4f0d9b5306cbd219822c&number=40&tags=dessert"
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setListRecipe(data.recipes);
      });
  }

  //add a recipe in calendarscreen
  function handleCalendar(data) {
    console.log(data);
    let calendarSteps = [];
    data.analyzedInstructions[0].steps.forEach(function (element) {
      calendarSteps.push(element.step);
    });
    let calendarIngredients = [];
    data.extendedIngredients.forEach(function (element) {
      calendarIngredients.push(element.name);
    });
    //calories
    let calendarCalories = "";
    if (data.summary[data.summary.indexOf("calories") - 4] === ">") {
      calendarCalories =
        data.summary[data.summary.indexOf("calories") - 3] +
        data.summary[data.summary.indexOf("calories") - 2] +
        data.summary[data.summary.indexOf("calories") - 1];
    } else {
      calendarCalories =
        data.summary[data.summary.indexOf("calories") - 4] +
        data.summary[data.summary.indexOf("calories") - 3] +
        data.summary[data.summary.indexOf("calories") - 2] +
        data.summary[data.summary.indexOf("calories") - 1];
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        image: data.image,
        ingredients: calendarIngredients,
        steps: calendarSteps,
        calories: calendarCalories,
        prepTime: data.readyInMinutes,
        token: user,
      }),
    };

    fetch("https://munch-box-backend.vercel.app/calendarRecipes", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result);
      });
  }

  //display the description of the recipe
  function handleDescription(data) {
    setImage(data.image);
    setTitle(data.title);
    setModalVisible(true);
    // console.log("========================", data.readyInMinutes);
    // console.log(data);
    if (data.summary[data.summary.indexOf("calories") - 4] === ">") {
      setCalories(
        data.summary[data.summary.indexOf("calories") - 3] +
          data.summary[data.summary.indexOf("calories") - 2] +
          data.summary[data.summary.indexOf("calories") - 1]
      );
    } else {
      setCalories(
        data.summary[data.summary.indexOf("calories") - 4] +
          data.summary[data.summary.indexOf("calories") - 3] +
          data.summary[data.summary.indexOf("calories") - 2] +
          data.summary[data.summary.indexOf("calories") - 1]
      );
    }

    setPrepTime(data.readyInMinutes);

    //return the ingredients array in the modal
    let newIngredients = [];
    data.extendedIngredients.forEach(function (element) {
      newIngredients.push(element.name);
    });
    setIngredientsList([...ingredientsList, ...newIngredients]);

    // the steps to display
    let steps = [];
    //console.log(data.analyzedInstructions[0].steps);
    data.analyzedInstructions[0].steps.forEach(function (element) {
      steps.push(element.step);
    });
    setDisplayedSteps([...displayedSteps, ...steps]);
  }

  // ======= FAVORITES RECIPES =======    //

  const favorites = useSelector((state) => state.favorites.value);

  function handleFavoris(data) {
    
    if (favorites.includes(data)) {
      //supprimer des Favoris
      dispatch(removeFavorites(data));
    } else {
      // Ajouter aux favoris
      dispatch(addFavorites(data));
    }
    // Tout supprimer ou cleaner store redux persist
    //dispatch(removeAllFavorites())
  }

  //add a recipe in calendarscreen

  function handleCalendar(data) {
    let calendarSteps = [];
    data.analyzedInstructions[0].steps.forEach(function (element) {
      calendarSteps.push(element.step);
    });
    let calendarIngredients = [];
    data.extendedIngredients.forEach(function (element) {
      calendarIngredients.push(element.name);
    });
    //calories
    let calendarCalories = "";
    if (data.summary[data.summary.indexOf("calories") - 4] === ">") {
      calendarCalories =
        data.summary[data.summary.indexOf("calories") - 3] +
        data.summary[data.summary.indexOf("calories") - 2] +
        data.summary[data.summary.indexOf("calories") - 1];
    } else {
      calendarCalories =
        data.summary[data.summary.indexOf("calories") - 4] +
        data.summary[data.summary.indexOf("calories") - 3] +
        data.summary[data.summary.indexOf("calories") - 2] +
        data.summary[data.summary.indexOf("calories") - 1];
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        image: data.image,
        ingredients: calendarIngredients,
        steps: calendarSteps,
        calories: calendarCalories,
        prepTime: data.readyInMinutes,
        token: user,
      }),
    };
    fetch("https://munch-box-backend.vercel.app/calendarRecipes/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result);
      });
  }
  //console.log(Array.isArray(ingredientsList));
  //console.log(typeof ingredientsList);
  //console.log(ingredientsList);

  function handlePressSwitcher() {
    setIsActive((current) => !current);
  }

  const newIngredientsArray = Array.from(ingredientsList).map((data, i) => {
    return (
      <View key={i}>
        <Text style={styles.ingredientsarray}>• {data}</Text>
      </View>
    );
  });
  const newStepsArray = displayedSteps.map((data, i) => {
    return (
      <View key={i}>
        <Text style={styles.stepsarray}>• {data}</Text>
      </View>
    );
  });

  // the array to display
  const Recipes = listRecipe.map((data, i) => {
    const isFavoriteActive = favorites.some(
      (favorite) => favorite.title === data.title
    );

    return (
      <View key={i} style={styles.cardRecipe}>
        <Image style={styles.imageRecipe} source={{ uri: data.image }} />
        <TouchableOpacity
          onPress={() => handleFavoris(data)}
          style={styles.iconHeart}
        >
          <FontAwesome
            name="heart"
            size={20}
            color={isFavoriteActive ? "red" : "#ffffff"}
          />
        </TouchableOpacity>
        <Text style={styles.cardTitle} onPress={() => handleDescription(data)}>
          {data.title}
        </Text>
        <View style={styles.cardInfo}>
          <View style={styles.containerInfo}>
            <FontAwesome name="clock-o" size={20} color={"#92C3BC"} />
            <Text style={styles.textInfo}>{data.time}</Text>
          </View>
          <View style={styles.containerInfo}>
            <TouchableOpacity onPress={() => handleCalendar(data)}>
              <FontAwesome
                name="calendar"
                size={20}
                color={"#83C5BC"}
                style={styles.iconCalendar}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  });

  //.log(Array.isArray(ingredientsList));
  console.log(prepTime);
  //console.log(isEnabled);

  // ======  MODAL RECIPE ====== //
  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        style={styles.modalContainer}
      >
        <View style={styles.scrollview}>
          <Image source={{ uri: image }} style={styles.chicken} />
          <Ionicons
            name="close"
            size={35}
            color="#dedede"
            style={styles.close}
            onPress={() => setModalVisible(false)}
          />
          
          <Text style={styles.title}>{title}</Text>
          <View style={styles.input}>
            <FontAwesome
              name="clock-o"
              size={25}
              color="#92C3BC"
              style={styles.icons}
            />
            <Text>{prepTime} mins</Text>
            <Ionicons
              name="barbell"
              size={25}
              color="#92C3BC"
              style={styles.icons}
            />
            <Text>{calories} kcal</Text>
          </View>
          <SwitchSelector
            buttonColor={"#92C3BC"}
            ios_backgroundColor={"#92C3BC"}
            hasPadding
            style={{ marginTop: 20 }}
            initial={0}
            onPress={() => handlePressSwitcher()}
            options={[
              { label: "Ingredients", value: "ingredients" },
              { label: "Steps", value: "steps" },
            ]}
          />
          <ScrollView>
            {isActive ? newIngredientsArray : newStepsArray}

            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              Nutrition Information
            </Text>

            <View style={styles.containeNutrition}>
              <View>
                <Text style={styles.textNutrition}>Glucide</Text>
                <View style={styles.infoContainer}>
                  <Image
                    style={styles.info}
                    source={require("../assets/icon/les-glucides.png")}
                  />
                </View>
                <Text style={styles.grammeNutrition}>58 g</Text>
              </View>

              <View>
                <Text style={styles.textNutrition}>Lipides</Text>

                <View style={styles.infoContainer}>
                  <Image
                    style={styles.info}
                    source={require("../assets/icon/grain.png")}
                  />
                </View>

                <Text style={styles.grammeNutrition}>11 g</Text>
              </View>

              <View>
                <Text style={styles.textNutrition}>Proteins</Text>
                <View style={styles.infoContainer}>
                  <Image
                    style={styles.info}
                    source={require("../assets/icon/proteine.png")}
                  />
                </View>
                <Text style={styles.grammeNutrition}>22 g</Text>
              </View>

              <View>
                <Text style={styles.textNutrition}>Fibres</Text>
                <View style={styles.infoContainer}>
                  <Image
                    style={styles.info}
                    source={require("../assets/icon/gras-trans.png")}
                  />
                </View>
                <Text style={styles.grammeNutrition}>28 g</Text>
              </View>

              <View>
                <Text style={styles.textNutrition}>Sale</Text>
                <View style={styles.infoContainer}>
                  <Image
                    style={styles.info}
                    source={require("../assets/icon/sel.png")}
                  />
                </View>
                <Text style={styles.grammeNutrition}>408 kcal</Text>
              </View>
            </View>
            {/* <Text style={{ fontWeight: "bold" }}>Read Reviews</Text> */}
            <Text style={{ fontWeight: "bold" }}>
              Rate this recipe:{" "}
              <FontAwesome
                name="star-o"
                size={20}
                color="#92C3BC"
                style={styles.note}
              />
              <FontAwesome
                name="star-o"
                size={20}
                color="#92C3BC"
                style={styles.note}
              />
              <FontAwesome
                name="star-o"
                size={20}
                color="#92C3BC"
                style={styles.note}
              />
              <FontAwesome
                name="star-o"
                size={20}
                color="#92C3BC"
                style={styles.note}
              />
              <FontAwesome
                name="star-o"
                size={20}
                color="#92C3BC"
                style={styles.note}
              />
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="Share your review with us..."
                style={styles.text}
              />
              <Pressable style={styles.submit}>
                <Ionicons
                  name="send-outline"
                  size={23}
                  color="#FAD874"
                  style={styles.iconsend}
                />
              </Pressable>
            </View>
            <Text style={styles.warning}>
              Experiencing an issue with the mobile site?
            </Text>
          </ScrollView>
        </View>
      </Modal>

      {/* Start of page that displays ALL Recipes */}
      <View style={styles.containerHeader}>
        <View>
          <FontAwesome
            name="chevron-left"
            size={20}
            color={"#92C3BC"}
            style={styles.buttonReturn}
            onPress={goBack}
          />
          <Text style={styles.welcomeText}>Hello Phifi</Text>
          <Text style={styles.tagline}>What you want to cook today ? </Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.containerIconUser}
            onPress={() => handleLogOut()}
          >
            <Image
              style={styles.imageProfil}
              source={require("../assets/Etchebest.jpg")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerFilter}>
        <View>
          <FontAwesome
            name="filter"
            size={25}
            color={"#ffffff"}
            style={styles.filterIcon}
            onPress={() => handleFilter()}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.contentScroll}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => handlePressStarter()}
            >
              <Text style={styles.menuBtnText}>Starter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => handlePressMainCourse()}
            >
              <Text style={styles.menuBtnText}>Main course </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => handlePressDessert()}
            >
              <Text style={styles.menuBtnText}>Dessert</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* <View style={styles.containerNumberRecipes}>
        <Text style={styles.textNumberRecipes}>
          Pick one and start cooking now!
        </Text>
      </View> */}
      {noResult ? (
        <Text>Sorry, no recipe corresponds to your search</Text>
      ) : (
        <ScrollView>
          <View style={styles.containerRecipes}>{Recipes}</View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 45,
    paddingHorizontal: 20,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeText: {
    color: "#83C5BC",
    fontWeight: "bold",
    fontSize: 30,
  },
  tagline: {
    color: "#ABAEB1",
    fontSize: 16,
  },
  containerIconUser: {
    // backgroundColor: "#92C3BC",
    // padding: 5,
    // justifyContent:"center",
    // width: 40,
    // height: 40,
    // borderRadius: 100,
  },
  iconUser: {
    textAlign: "center",
  },
  imageProfil: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#83C5BC",
  },

  containerNumberRecipes: {
    flexDirection: "row",
    alignItems: "flex-start",
    //justifyContent:"center",
    marginBottom: 10,
  },
  textNumberRecipes: {
    fontSize: 18,
  },
  numberRecipe: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#83C5BC",
  },
  containerFilter: {
    flexDirection: "row",
    marginBottom: 30,
  },
  filterIcon: {
    backgroundColor: "#FFD87D",
    padding: 5,
    paddingHorizontal: 8,
    marginRight: 10,
    borderRadius: 100,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
    //borderTopRightRadius: 30,
    //borderTopLeftRadius: 30,
  },
  contentScroll: {
    //height: 25,
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-evenly",
    //marginBottom: 30,
  },
  menuBtn: {
    paddingHorizontal: 20,
    backgroundColor: "#83C5BC",
    marginHorizontal: 5,
    borderRadius: 20,
    //borderBottomWidth: 2,
    // borderBottomColor: "#92C3BC",
  },
  menuBtnText: {
    fontSize: 16,
    paddingBottom: 5,
    color: "#ffffff",
  },
  containerRecipes: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  cardRecipe: {
    backgroundColor: "rgba(255, 216, 125, 0.3)",
    marginHorizontal: 5,
    paddingBottom: 10,
    borderRadius: 15,
    height: "auto",
    marginBottom: 20,
  },
  cardTitle: {
    paddingVertical: 10,
    fontWeight: "500",
    paddingLeft: 5,
    width: 150,
  },
  imageRecipe: {
    width: 150,
    height: 150,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  cardInfo: {
    paddingHorizontal: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  containerInfo: {
    flexDirection: "row",
  },
  textInfo: {
    paddingLeft: 5,
    fontSize: 12,
  },
  iconHeart: {
    position: "absolute",
    top: 15,
    right: 10,
  },

  //modal style
  warning: {
    fontWeight: "200",
    textAlign: "center",
    fontSize: 12,
  },
  containeNutrition: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  textNutrition: {
    fontSize: 12,
    textAlign: "center",
    paddingBottom: 5,
  },
  grammeNutrition: {
    paddingTop: 4,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
  },
  chicken: {
    width: "100%",
    height: "30%",
    borderRadius: 30,
    marginTop: 30,
  },
  close: {
    position: "absolute",
    top: 40,
    right: 40,
    color: "white",
    backgroundColor: "rgba(0,0,0, 0.3)",
    padding: 7,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  heart: {
    position: "absolute",
    top: 50,
    right: 60,
    color: "red",
  },
  // container: {
  //    backgroundColor: "white",
  //    alignItems: "center",
  // },
  modalContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFF4CF",
  },
  scrollview: {
    flex: 1,
    backgroundColor: "#FFF4CF",
    paddingBottom: 20,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginRight: 15,
  },
  icons: {
    paddingRight: 5,
    paddingLeft: 30,
  },
  star: {
    marginTop: 20,
    flexDirection: "row",
  },
  starnote: {
    paddingLeft: 80,
  },
  ingredient: {
    marginTop: 30,
  },
  infoContainer: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.24,
    elevation: 3,
  },
  info: {
    width: 35,
    height: 35,
  },
  text: {
    backgroundColor: "white",
    padding: 2,
    marginTop: 30,
    width: "80%",
    borderColor: "#E9E9E9",
    borderRadius: 5,
    fontSize: 14,
    marginBottom: 50,
    paddingLeft: 10,
  },
  submit: {
    backgroundColor: "#92C3BC",
    width: 40,
    height: 35,
    borderRadius: 5,
    marginTop: 30,
    alignItems: "center",
    paddingLeft: 5,
  },
  iconsend: {
    paddingTop: 3,
  },
  modalView: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  stepsarray: {
    color: "#343333",
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginTop: 20,
    //paddingBottom: 10,
  },
  ingredientsarray: {
    color: "#343333",
    fontWeight: "bold",
    //paddingBottom: 10,
    paddingTop: 10,
    marginRight: 70,
    justifyContent: "flex-start",
  },
});
