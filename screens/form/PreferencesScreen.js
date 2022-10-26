import { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function PreferencesScreen({ formData, setFormData }) {

  // Répurération de la data pour le form final
  // preference:"",
  // optionPreference:"",



  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);

  // Récupérer et stocker les aliments écrit par l'utilisateur dans l'input
  const addPreferenceClick = () => {

    //Afficer les aliments taper par l'utilisateur
    setIngredientList([...ingredientList, ingredient]);
    setIngredient("");

    // variable pour relier au formulaire
    const allergies = [...ingredientList, ingredient];
    setFormData({...formData, allergies})
  };


  // Ajouter des aliments à la liste des allergies
  const listPreference = ingredientList.map((data, i) => {
    return (
      <View key={i} style={styles.addOption}>
        <Text style={styles.textOption}> {data}</Text>
        <FontAwesome name="close" size={15} color={"#000"} onPress={() => deleteClick()} style={styles.btnDelete} />
      </View>
    );
  });

  // Liste par défaut des aliments pour les intollérances 
  const optionsData = [
    { id: 1, name: "Grain", photo: require("../../assets/icon/grain.png") },
    { id: 2, name: "Shrimp", photo: require("../../assets/icon/shrimp.png") },
    { id: 3, name: "Porc", photo: require("../../assets/icon/porc.png") },
    { id: 4, name: "Watermelon", photo: require("../../assets/icon/watermelon.png") },
    { id: 5, name: "Mushroom", photo: require("../../assets/icon/mushroom.png"), },
    { id: 6, name: "Salad", photo: require("../../assets/icon/salad.png") },
    { id: 7, name: "Peanut", photo: require("../../assets/icon/peanut.png") },
    {
      id: 8, name: "Oeuf-dur", photo: require("../../assets/icon/oeuf-dur.png"),
    },
  ];

  //backgroundColor: isActive ? 'salmon' : '',  color: isActive ? 'white' : '',


  const optionPreferences = optionsData.map((data, i) => {

    const [isActive, setIsActive] = useState(false);

    const[preference, setPreference] = useState([]);
    //const [preferenceList, setPreferenceList] = useState([]);

  
    const OptionClik = () => {
      //console.log(data.name);
      setPreference(data.name)
      console.log(preference);
      
     //setPreference([...preferenceList, preference]);
      //setFormData({...formData, preference})

      // setIsActive(current => !current);

      //onPress={(preference) => setFormData({...formData, preference })}
    };




    return (
      <View key={i} style={styles.section}>
        <TouchableOpacity value={preference} onPress={OptionClik}>
          <Image source={data.photo} style={styles.photo} />
          <Text style={styles.textOption}>{data.name}</Text>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food preferences</Text>
      <Text style={styles.subTitle}>I don't like to eat ...</Text>

      <View style={styles.containerInput}>
        <TextInput placeholder="Tell me what you don’t eat" onChangeText={(value) => setIngredient(value)} value={ingredient} style={styles.input}/>
        <View>
          <FontAwesome name="plus" size={20} color={"#ffffff"} onPress={() => addPreferenceClick()} style={styles.btnPlus} />
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
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    //color:"#ABAEB1",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "96%",
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
  },
  btnPlus: {
    backgroundColor: "#e8be4b",
    borderRadius: 100,
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
  textOption: {
    textAlign: "center",
  },
});
