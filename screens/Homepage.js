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
import React from "react";
import Recettepage from "./Recettepage";
import { LinearGradient } from "expo-linear-gradient";
import Placard from "./Placard";
import { useDispatch } from "react-redux";
import { updateIsFiltered, removeIsFiltered } from "../reducers/choosePaths";

export default function Homepage({ navigation }) {
  const dispatch = useDispatch();
  return (
    <ImageBackground
      source={require("../assets/fondecran4.png")}
      imageStyle={{ borderRadius: 20 }}
      style={styles.mainContainer}
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.containDescription}
      >
        <Text style={styles.title}>Need inspiration</Text>
        <Text style={styles.tagline}>Trouver une recette ? </Text>
        
        <View>
        <Text style={styles.textChoice}>
          Avec les ingredients de votre placart
        </Text>

        <View style={styles.containerButton}>
          <TouchableOpacity
            onPress={() => {
              dispatch(removeIsFiltered());
              navigation.navigate("TabNavigator");
            }}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text>Ok, great!</Text>
          </TouchableOpacity>
        </View>
        
        </View>

        {/* <TouchableOpacity
              onPress={() => {
                dispatch(updateIsFiltered());
                navigation.navigate("Placard");
              }}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text>Ok, great!</Text>
            </TouchableOpacity> */}
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 50,
    //paddingHorizontal: 20,
    //justifyContent: "space-between",
    //alignItems: "center",
  },
  title: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 30,
  },
  tagline: {
    color: "#ABAEB1",
    fontSize: 16,
  },
  containerChoice: {
    flex: 1,
    paddingHorizontal: 20,
    //height: "100%",
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
  },
  backgroundContain: {
    justifyContent: "flex-end",
    //padding: 20,
    //paddingBottom:50,
  },
  containDescription: {
    flex: 1,
    paddingHorizontal: 20,
  },
  textChoice: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 20,
    // paddingBottom:15,
  },
  containerButton: {
    alignItems: "center",
    paddingTop: 10,
  },
  button: {
    backgroundColor: "#FFD87D",
    padding: 10,
    borderBottomStartRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    width: "50%",
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
