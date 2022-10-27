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

export default function Homepage({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
          style={styles.imageBackground1}
          source={require("../assets/achat.png")}
        />
        <Image
          style={styles.imageBackground2}
          source={require("../assets/panier.png")}
        />
      </View>

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
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9D77E",
  },
  texto: {
    fontSize: 20,
  },
  imageBackground1: {
    width: "100%",
    height: "50%",
    borderBottomLeftRadius: 160,
    borderBottomRightRadius: 660,
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    backgroundColor: "#F9D77E",

    flex: 1,
  },
  imageBackground2: {
    width: "100%",
    height: "50%",
    borderBottomLeftRadius: 660,
    borderBottomRightRadius: 160,
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    backgroundColor: "#F9D77E",
    flex: 1,
  },
  textChoix1: {
    color: "#DE45FF",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
    position: "absolute",
    top: 250,
    right: 60,
  },
  textChoix2: {
    color: "#DE45FF",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
    position: "absolute",
    top: 550,
    right: 90,
  },
  image: {
    width: "100%",
    height: "50%",
    left: 60,
  },
  textButton: {
    color: "#DE45FF",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },

  button1: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 100,
    position: "absolute",
    top: 300,
    right: 160,
  },

  button2: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 100,
    position: "absolute",
    top: 600,
    right: 160,
  },
});
