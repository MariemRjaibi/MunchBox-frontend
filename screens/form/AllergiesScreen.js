import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function AllergiesScreen({ formData, setFormData }) {
  // ======= List of ingredients entered by user ======= //
  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);

  const deleteClick = () => {
    setIngredientList(ingredientList.filter((e) => e !== ingredient));
  };

  //Save 
  const addPreferenceClick = () => {
    setIngredientList([...ingredientList, ingredient]);
    setIngredient("");

    const allergies = [...ingredientList, ingredient];
    setFormData({ ...formData, allergies });
  };

  // display the ingredients entered by the user
  const listPreference = ingredientList.map((data, i) => {
    return (
      <View key={i} style={styles.addOption}>
        <Text style={styles.textOption}> {data}</Text>
        <FontAwesome
          name="close"
          size={15}
          color={"#000"}
          onPress={() => deleteClick()}
          style={styles.btnDelete}
        />
      </View>
    );
  });

  // ======= Default list of allergies proposed to the user ======= //
  const optionsData = [
    { id: 1, name: "Grain", photo: require("../../assets/icon/grain.png") },
    {
      id: 2,
      name: "Shellfish",
      photo: require("../../assets/icon/shrimp.png"),
    },
    { id: 3, name: "Porc", photo: require("../../assets/icon/porc.png") },
    { id: 4, name: "Sesame", photo: require("../../assets/icon/sesame.png") },
    { id: 5, name: "Dairy", photo: require("../../assets/icon/milk.png") },
    {
      id: 6,
      name: "Soja",
      photo: require("../../assets/icon/graine-de-soja.png"),
    },
    { id: 7, name: "Peanut", photo: require("../../assets/icon/peanut.png") },
    { id: 8, name: "Egg", photo: require("../../assets/icon/oeuf-dur.png") },
  ];



  // Add the option chosen by the user to an array
  const [preferenceList, setPreferenceList] = useState([]);

  const preferenceClik = (data) => {

    if (preferenceList.includes(data.name)) {
      // Filter if the name exists already
      setPreferenceList(preferenceList.filter((e) => e !== data.name));
      setFormData({
        ...formData,
        allergiesOption: [...preferenceList].filter((e) => e !== data.name),
      });
    } else {
      // push
      setPreferenceList([...preferenceList, data.name]);
      setFormData({
        ...formData,
        allergiesOption: [...preferenceList, data.name],
      });
    }
  };

  const optionPreferences = optionsData.map((data, i) => {
    // Change the color if it is already in the array
    let isActive = preferenceList.some((e) => {
      return e === data.name;
    });

    return (
      <View
        key={i}
        style={styles.section}
        backgroundColor={isActive ? "#E8F4F5" : "#ffffff"}
      >
        <TouchableOpacity onPress={() => preferenceClik(data)}>
          <Image source={data.photo} style={styles.photo} />
          <Text style={styles.textOptionDefaut}>{data.name}</Text>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Allergies</Text>
      <Text style={styles.subTitle}>I can't eat ...</Text>

      <View style={styles.containerInput}>
        <TextInput
          placeholder="Tell me what you can’t eat"
          onChangeText={(value) => setIngredient(value)}
          value={ingredient}
          style={styles.input}
        />
        <View>
          <FontAwesome
            name="plus"
            size={20}
            color={"#ffffff"}
            onPress={() => addPreferenceClick()}
            style={styles.btnPlus}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.containerOption}>{listPreference}</View>
        <View style={styles.containerPreference}>{optionPreferences}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#92C3BC",
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    //color:"#ABAEB1",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#E9E9E9",
    borderRadius: 100,
    fontSize: 14,
  },
  textOption: {
    paddingRight: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  btnPlus: {
    backgroundColor: "#e8be4b",
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 100,
    right: 50,
    top: 3,
  },
  contentContainer: {
    margin: 0,
    padding: 0,
  },
  containerOption: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  addOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#92C3BC",
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 100,
    marginHorizontal: 5,
    marginTop: 10,
  },
  btnDelete: {
    color: "#ffffff",
  },
  containerPreference: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  section: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginBottom: 20,
    marginLeft: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.24,
    elevation: 3,
  },
  photo: {
    margin: 10,
    width: 40,
    height: 40,
  },
  textOptionDefaut: {
    textAlign: "center",
  },
});
