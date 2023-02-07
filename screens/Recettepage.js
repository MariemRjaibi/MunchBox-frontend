import { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { addFavorites, removeFavorites } from "../reducers/favorites";
import { recetteScreen } from "../reducers/fromWhichScreen";
import { logout } from "../reducers/users";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import SigninScreen from "./SigninScreen";

export default function Recettepage({ navigation }) {
  // ======= Back button =======//
  const goBack = () => {
    navigation.goBack();
  };

  const [listRecipe, setListRecipe] = useState([]);
  const [noResult, setNoResult] = useState(false);

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
    //structure of filter string on api

    let newIngApi = "";
    for (let i = 0; i < ingredientsFromFilter.length; i++) {
      newIngApi += `${ingredientsFromFilter[i].toLowerCase()}+,`;
    }
    let apiUrl = "";
    //select which api key according from where this screen has been dispayed
    if (isFiltered) {
      apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=a1425b05fa144d0496da062596d9ef97&tags=${newIngApi}&number=400`;
    } else {
      apiUrl =
        "https://api.spoonacular.com/recipes/random?apiKey=a1425b05fa144d0496da062596d9ef97&number=40";
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
        setListRecipe(data.recipes);
      });
  }

  function handlePressMainCourse() {
    fetch(
      "https://api.spoonacular.com/recipes/random?apiKey=c2766ffb9a9f4f0d9b5306cbd219822c&number=40&tags=lunch"
    )
      .then((response) => response.json())
      .then((data) => {
        setListRecipe(data.recipes);
      });
  }

  function handlePressDessert() {
    fetch(
      "https://api.spoonacular.com/recipes/random?apiKey=c2766ffb9a9f4f0d9b5306cbd219822c&number=40&tags=dessert"
    )
      .then((response) => response.json())
      .then((data) => {
        setListRecipe(data.recipes);
      });
  }

  //add a recipe in calendarscreen
  function handleCalendar(data) {
    //adding recipe steps
    let calendarSteps = [];
    data.analyzedInstructions[0].steps.forEach(function (element) {
      calendarSteps.push(element.step);
    });
    // adding recipe ingredients
    let calendarIngredients = [];
    data.extendedIngredients.forEach(function (element) {
      calendarIngredients.push(element.name);
    });

    //grap calories from the paragraph of summary
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

    fetch(
      "https://munch-box-backend.vercel.app/calendarRecipes",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result);
      });
  }

  //display the description of the recipe
  function handleDescription(data) {
    dispatch(recetteScreen());
    navigation.navigate("Descriptif", (paramKey = data));
  }

  // ======= FAVORITES RECIPES =======    //

  const favorites = useSelector((state) => state.favorites.value);

  function handleFavoris(data) {
    if (favorites.includes(data)) {
      //remove Favoris
      dispatch(removeFavorites(data));
    } else {
      // add to Favoris
      dispatch(addFavorites(data));
    }
  }
  // To clear the store redux persist
  //dispatch(removeAllFavorites())

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
    fetch(
      "https://munch-box-backend.vercel.app/calendarRecipes/",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result);
      });
  }

  // the array/list to display
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
            <FontAwesome name="clock-o" size={20} color={"#92C3BC"} x />

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

  // ======  MODAL RECIPE ====== //
  return (
    <View style={styles.container}>
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
  },

  menu: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuBtn: {
    paddingHorizontal: 20,
    backgroundColor: "#83C5BC",
    marginHorizontal: 5,
    borderRadius: 20,
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
});
