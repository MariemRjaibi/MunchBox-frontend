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
} from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Recettepage(navigation) {
  const [listRecipe, setListRecipe] = useState([]);
  const [startRecipe, setStartRecipe] = useState([]);
  const [mcRecipe, setMcRecipe] = useState([]);
  const [anyFilter, setAnyFilter] = useState(true);
  const [isStarter, setIsStarter] = useState(false);
  const [isMainCourse, setIsMainCourse] = useState(false);
  const [isDessert, setIsDessert] = useState(false);
  const [isSideDish, setIsSideDish] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.spoonacular.com/recipes/random?apiKey=0b9f0e7f50714fbab1c330efde390d64&number=40"
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
      "https://api.spoonacular.com/recipes/random?apiKey=0b9f0e7f50714fbab1c330efde390d64&number=40&tags=starter"
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setListRecipe(data.recipes);
      });
  }

  function handlePressMainCourse() {
    fetch(
      "https://api.spoonacular.com/recipes/random?apiKey=0b9f0e7f50714fbab1c330efde390d64&number=40&tags=lunch"
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setListRecipe(data.recipes);
      });
  }

  function handlePressDessert() {
    fetch(
      "https://api.spoonacular.com/recipes/random?apiKey=0b9f0e7f50714fbab1c330efde390d64&number=40&tags=dessert"
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setListRecipe(data.recipes);
      });
  }

  // the array to display

  const Recipes = listRecipe.map((data, i) => {
    return (
      <View key={i} style={styles.cardRecipe}>
        <Image style={styles.imageRecipe} source={{ uri: data.image }} />
        <FontAwesome
          name="heart"
          size={20}
          color={"#000"}
          style={styles.iconContent}
        />
        <Text style={styles.cardTitle}>{data.title}</Text>
        <View style={styles.cardInfo}>
          <View style={styles.containerInfo}>
            <FontAwesome name="clock-o" size={20} color={"#92C3BC"} />
            <Text style={styles.textInfo}>{data.time}</Text>
          </View>
          <View style={styles.containerInfo}>
            <FontAwesome
              name="calendar"
              size={20}
              color={"#83C5BC"}
              onPress={() => addClick()}
              style={styles.btnDelete}
            />
          </View>
        </View>
      </View>
    );
  });
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View>
          <Text style={styles.welcomeText}>Hello Phifi</Text>
          <Text style={styles.tagline}>What you want to cook today ? </Text>
        </View>

        <View>
          <TouchableOpacity style={styles.containerIconUser}>
            {/* <FontAwesome name="user" size={20} color={"#fff"}  style={styles.iconUser}/> */}
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
    borderRadius: 100,
    marginRight: 10,
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
});
