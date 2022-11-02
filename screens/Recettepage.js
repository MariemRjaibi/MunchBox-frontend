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
import { addFavorites } from "../reducers/favorites";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
export default function Recettepage({ navigation }) {
  const [listRecipe, setListRecipe] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [modalFilterVisible, setModalFilterVisible] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [displayedSteps, setDisplayedSteps] = useState([]);
  const [apikey, setApiKey] = useState("");
  const user = useSelector((state) => state.users.value.token);
  const dispatch = useDispatch();
  const favoris = useSelector((state) => {
    console.log(state);
    return state;
  });



  // const [startRecipe, setStartRecipe] = useState([]);
  // const [mcRecipe, setMcRecipe] = useState([]);
  // const [anyFilter, setAnyFilter] = useState(true);
  // const [isStarter, setIsStarter] = useState(false);
  // const [isMainCourse, setIsMainCourse] = useState(false);
  // const [isDessert, setIsDessert] = useState(false);
  // const [isSideDish, setIsSideDish] = useState(false);

  function handleFilter() {
    navigation.navigate(Filter);
  }

  useEffect(() => {
    const _clearAll = async () => {
      try {
        await AsyncStorage.clear();
        console.log("Done");
      } catch (error) {
        console.log(error);
      }
    };
    // _clearAll();
    fetch(
      "https://api.spoonacular.com/recipes/random?apiKey=b41bc51d711c4c78a32661c3968b6e8b&number=40"
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setListRecipe(data.recipes);
      });
  }, []);

  // handle filters

  function handlePressStarter() {
    fetch(
      "https://api.spoonacular.com/recipes/random?apiKey=b41bc51d711c4c78a32661c3968b6e8b&number=40&tags=starter"
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setListRecipe(data.recipes);
      });
  }

  function handlePressMainCourse() {
    fetch(
      "https://api.spoonacular.com/recipes/random?apiKey=b41bc51d711c4c78a32661c3968b6e8b&number=40&tags=lunch"
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setListRecipe(data.recipes);
      });
  }

  function handlePressDessert() {
    fetch(
      "https://api.spoonacular.com/recipes/random?apiKey=b41bc51d711c4c78a32661c3968b6e8b&number=40&tags=dessert"
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setListRecipe(data.recipes);
      });
  }

  //display the description of the recipe
  function handleDescription(data) {
    setImage(data.image);
    setTitle(data.title);
    setModalVisible(true);
    //console.log(data.readyInMinutes);
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

  function handleFavoris(data) {
    dispatch(addFavorites(data.title));
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
fetch("http://192.168.10.204:3000/calendarRecipes/", requestOptions)
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
        <Text>{data}</Text>
      </View>
    );
  });
  const newStepsArray = displayedSteps.map((data, i) => {
    return (
      <View key={i}>
        <Text>{data}</Text>
      </View>
    );
  });

  // the array to display
  const Recipes = listRecipe.map((data, i) => {
    return (
      <TouchableOpacity onPress={() => handleDescription(data)}>
        <View key={i} style={styles.cardRecipe}>
          <Image style={styles.imageRecipe} source={{ uri: data.image }} />
          <TouchableOpacity onPress={() => handleFavoris(data)}>
            <FontAwesome
              name="heart"
              size={20}
              color={"#000"}
              style={styles.iconContent}
            />
          </TouchableOpacity>
          <Text style={styles.cardTitle}>{data.title}</Text>
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
                style={styles.btnDelete}
              />
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  //.log(Array.isArray(ingredientsList));
console.log(prepTime)
  //console.log(isEnabled);
  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        style={styles.modalContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollview}>
          <Image source={{ uri: image }} style={styles.chicken} />
          <Ionicons
            name="close"
            size={24}
            color="#dedede"
            style={styles.close}
            onPress={() => setModalVisible(false)}
          />
          <Ionicons
            name="heart"
            size={24}
            color="#dedede"
            style={styles.heart}
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
          <View style={styles.star}>
            <FontAwesome
              name="star-o"
              size={25}
              color="#92C3BC"
              style={styles.note}
            />
            <FontAwesome
              name="star-o"
              size={25}
              color="#92C3BC"
              style={styles.note}
            />
            <FontAwesome
              name="star-o"
              size={25}
              color="#92C3BC"
              style={styles.note}
            />
            <FontAwesome
              name="star-o"
              size={25}
              color="#92C3BC"
              style={styles.note}
            />
            <Text style={styles.starnote}> 4/5 (123 reviews)</Text>
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
          <Text style={{ fontSize: 10 }}>
            Fat Carbohydrates Sugar Cholesterol Sodium Protein
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="fast-food-outline"
              size={25}
              color="#92C3BC"
              style={styles.info}
            />
            <Ionicons
              name="fast-food-outline"
              size={25}
              color="#92C3BC"
              style={styles.info}
            />
            <Ionicons
              name="fast-food-outline"
              size={25}
              color="#92C3BC"
              style={styles.info}
            />
            <Ionicons
              name="fast-food-outline"
              size={25}
              color="#92C3BC"
              style={styles.info}
            />
            <Ionicons
              name="fast-food-outline"
              size={25}
              color="#92C3BC"
              style={styles.info}
            />
            <Ionicons
              name="fast-food-outline"
              size={25}
              color="#92C3BC"
              style={styles.info}
            />
          </View>
          <Text>Read Reviews</Text>
          <Text>
            Rate this recipe:{" "}
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
          <Text>Experiencing an issue with the mobile site?</Text>
        </ScrollView>
      </Modal>
      <View style={styles.containerHeader}>
        <View>
          <Text style={styles.welcomeText}>Hello Phifi</Text>
          <Text style={styles.tagline}>What you want to cook today ? </Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.containerIconUser}
            onPress={() => handleFilter()}
          >
            {/* <FontAwesome name="user" size={20} color={"#fff"}  style={styles.iconUser}/> */}
            <Image
              style={styles.imageProfil}
              source={require("../assets/filter.png")}
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
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.contentScroll}
          horizontal={true}
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

      <View style={styles.containerNumberRecipes}>
        <Text style={styles.textNumberRecipes}>Selected recipes : </Text>
        <Text style={styles.numberRecipe}>12</Text>
      </View>
      <ScrollView>
        <View style={styles.containerRecipes}>{Recipes}</View>
      </ScrollView>
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
    width: 50,
    height: 50,
    // borderRadius: 100,
    // borderWidth: 2,
    // borderColor: "#83C5BC",
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
    //backgroundColor: "#FFD87D",
    //padding: 7,
    //borderRadius: 100,
  },
  containerFilter: {
    flexDirection: "row",
    marginBottom: 30,
  },
  filterIcon: {
    backgroundColor: "#FFD87D",
    padding: 5,
    paddingHorizontal: 8,
    borderRadius: 'width * 0.125*0.5',
    marginRight: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
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
    //fontWeight: "bold",
    paddingBottom: 5,
    color: "#ffffff",
  },
  containerRecipes: {
    flexDirection: "row",
    flexWrap: "wrap",
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
  iconContent: {
    position: "absolute",
    top: 10,
    right: 10,
    color: "red",
  },

  //modal style
  chicken: {
    width: "100%",
    height: "30%",
    borderRadius: 30,
    marginTop: 30,
  },
  close: {
    position: "absolute",
    top: 10,
    right: 10,
    color: "black",
  },
  heart: {
    position: "absolute",
    top: 40,
    right: 50,
    color: "red",
  },
  // container: {
  //    backgroundColor: "white",
  //    alignItems: "center",
  // },
  modalContainer: { flex: 1, width: "100%", backgroundColor: "#FFF4CF" },
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
  info: {
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 30,
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
});
