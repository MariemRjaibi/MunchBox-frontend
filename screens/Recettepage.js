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
import Ionicons from "react-native-vector-icons/Ionicons";
import Homepage from "./Homepage";
import { useNavigation } from "@react-navigation/native";

export default function Recettepage(navigation) {
  let ideeRecette = [
    {
      id: 4,
      Name: "Steak with Oriental vegetables",
      desc: "An old favorite gets and exotic touch",
      image: require("../assets/achat.png"),
      color: "#FD9B9E",
      serving: "1 plate (500 - 600G)",
      servingNb: 1,
      longDesc:
        "Mouth-melting carrots and tender turnips roasted in Moroccan spices accompany a classic, juicy steak.",
      level: "easy",
      time: "35 min",
      rating: 4.2,
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate(Recettepage)}
        style={styles.button1}
        activeOpacity={0.8}
      ></TouchableOpacity>
      <Button title="retour" onPress={() => navigation.navigate("Homepage")} />
      <Button onPress={Homepage} title="Retour" color="#841584" />
      <Text style={styles.title}>Choisis ta recette</Text>

      <View style={styles.cards}>
        <View style={styles.carteRecette}>
          <Ionicons
            name="calendar"
            size={24}
            color="#dedede"
            style={styles.iconCalendar}
          />
          <Ionicons
            name="time"
            size={24}
            color="#dedede"
            style={styles.iconTime}
          />
          <Image
            style={styles.imageRecette1}
            source={require("../assets/plat.png")}
          />
          <Ionicons name="heart" size={24} style={styles.iconContent} />
        </View>
        <View></View>
        <View style={styles.carteRecette}>
          <Ionicons
            name="calendar"
            size={24}
            color="#dedede"
            style={styles.iconCalendar}
          />
          <Ionicons
            name="time"
            size={24}
            color="#dedede"
            style={styles.iconTime}
          />
          <Image
            style={styles.imageRecette1}
            source={require("../assets/pizza.png")}
          />
          <Ionicons
            name="heart"
            size={24}
            color="#dedede"
            style={styles.iconContent}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 110,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#655074",
    marginLeft: 20,
    fontFamily: Platform.select({ ios: "Georgia", android: "serif" }),
    marginBottom: 20,
  },
  cards: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    alignContent: "space-between",
  },
  button1: {
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 100,
    position: "absolute",
    top: 300,
  },
  carteRecette: {
    backgroundColor: "#F9D77E",
    width: 200,
    height: 250,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  imageRecette1: {
    justifyContent: "center",

    width: 180,
    height: 180,
  },
  iconContent: {
    position: "absolute",
    top: 10,
    right: 10,
    color: "red",
  },
  iconCalendar: {
    position: "absolute",
    bottom: 30,
    right: 10,
    color: "black",
  },
  iconTime: {
    position: "absolute",
    bottom: 30,
    left: 10,
    color: "black",
  },
});
