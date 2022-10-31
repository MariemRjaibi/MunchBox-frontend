import { NavigationContainer } from "@react-navigation/native";
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import Recettepage from "./Recettepage";
import Placard from "./Placard";
import { useDispatch } from "react-redux";
import { updateIsFiltered } from "../reducers/choosePaths";

export default function Homepage({ navigation }) {
  const dispatch = useDispatch();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.upContainer}>
        <Text>You lack inspiration?</Text>
        <Text>Find a recipe and get your shopping list</Text>
        <Image
          style={styles.upImage}
          source={require("../assets/recipes.png")}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("TabNavigator")}
          style={styles.button1}
          activeOpacity={0.8}
        >
          <Text>Ok, great!</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Text>Find recipes based on ingredients that you have on hand</Text>
        <Image
          style={styles.bottomImage}
          source={require("../assets/vegetables.png")}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Placard");
            dispatch(updateIsFiltered());
          }}
          style={styles.button1}
          activeOpacity={0.8}
        >
          <Text>Yes!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  {
    /* 
      <Text style={styles.textChoix1}>
        En manque d'idées ?? Trouves ta recette!!
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate(Recettepage)}
        style={styles.button1}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}> ICI</Text>
      </TouchableOpacity>
      <Text style={styles.textChoix2}> Que faire avec mes produits?</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate(Placard)}
        style={styles.button2}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}> HERE</Text>
      </TouchableOpacity> */
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // width: "100%",
    // height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upContainer: {
    width: "100%",
    flex: 1,
    height: "40%",
    width: "80%",
    backgroundColor: "rgba(146,195,188, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10%",
    borderRadius: 15,
    // borderColor: "#F9D77E",
    // borderWidth: 2,
    marginTop: "10%",
    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.0,
    // shadowRadius: 4.84,
    // elevation: 5,
  },
  bottomContainer: {
    width: "100%",
    flex: 1,
    height: "40%",
    width: "80%",
    backgroundColor: "rgba(146,195,188, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    // borderColor: "#F9D77E",
    // borderWidth: 2,
    marginBottom: "10%",
  },
  upImage: {
    marginTop: "10%",
    width: "40%",
    height: "40%",
    marginBottom: "10%",
  },
  bottomImage: {
    marginTop: "10%",
    width: "30%",
    height: "30%",
    marginBottom: "10%",
  },
  button1: {
    backgroundColor: "#F9D77E",
    borderRadius: 15,
    padding: 9,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.84,
    elevation: 5,
  },
});
