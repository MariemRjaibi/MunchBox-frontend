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
      source={require("../assets/background-concept.jpg")}
      imageStyle={{ borderRadius: 20 }}
      style={styles.mainContainer}
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.containDescription}
      >
        <View style={styles.containerOption}>
          <Text style={styles.title}>
            You lack inspiration? {"\n"}Find a recipe and get your shopping list
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
                <Text>Oh, yes!</Text>
              </TouchableOpacity>
            </View>
          </View>

          

          

            <View style={styles.containerOption}>
              <Text style={styles.title}>
                Find recipes based on ingredients that you have on hand
              </Text>
              <View style={styles.containerButton}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(removeIsFiltered());
                  navigation.navigate("Placard");
                }}
                style={styles.button}
                activeOpacity={0.8}
              >
              
                <Text>Ok, great!</Text>
              </TouchableOpacity>
              </View>
            </View>
          
      

        
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 50,
  },
  containDescription: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  containerOption:{
      backgroundColor:"rgba(0,0,0, 0.6)",
      borderRadius:20,
      padding:30,
  },
  title: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign:"center",
    paddingBottom:15,
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
