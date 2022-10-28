import { useDeferredValue, useState } from "react";
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

  // Donnée à récupérer 
  // regime:"",

   const[preference, setPreference] = useState("");
   const [preferenceList, setPreferenceList] = useState([]);

   //Changement de couleur -> True or False
   const inativeColor = "#ffffff";
   const activeColor = "#E8F4F5";

   // Probleme avec rgba fait un petit carre foncé sur le texte
   //const activeColor = "rgba(146,195,188, 0.4)";
  


  // Liste par défaut des regime alimentaire
  const optionsData = [
    { id: 1, name: "Vegan", photo: require("../../assets/icon/grain.png"), isActive: true, },
    { id: 2, name: "Vegetarian", photo: require("../../assets/icon/shrimp.png"), isActive: false, },
    { id: 3, name: "Pescatarian", photo: require("../../assets/icon/watermelon.png"), isActive: false, },
    { id: 4, name: "Gluten Free", photo: require("../../assets/icon/mushroom.png"), isActive: false, },
    { id: 5, name: "Lacto-vegetarian", photo: require("../../assets/icon/salad.png"), isActive: false, },
    { id: 6, name: "Ovo-vegetarian", photo: require("../../assets/icon/peanut.png"), isActive: false, },
    { id: 7, name: "Paleo", photo: require("../../assets/icon/oeuf-dur.png"), isActive: false,},
  ];

   

  const optionPreferences = optionsData.map((data, i) => {

    const [isActive, setIsActive] = useState(false);

    const preferenceClik = () => {

      // True or False
      setIsActive((current) => !current);
      console.info(isActive);
      
      setPreference(data.name);
      //console.log(data.name);

      // Ajouter tous les choix dans un tableau
      setPreferenceList([...preferenceList, data.name]);

      // Meilleur methode mais bug ? 
      // setPreferenceList([...preferenceList, preference]);
  
      const regime = [...preferenceList, data.name];
      setFormData({...formData, regime})
      
    };

    optionsData.filter(value => value.isActive)

    //style={[{ backgroundColor: data.isActive ? "pink" : "grey", fontSize: data.isActive ? "10" : "20", }]}


    return (
      <View key={i}  style={styles.section} backgroundColor={isActive ? activeColor : inativeColor}>
        <TouchableOpacity onPress={() => preferenceClik()} value={preference}>
          <Image source={data.photo} style={styles.photo} />
          <Text style={styles.textOption} >{data.name}</Text>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍉 Food preferences</Text>
      <Text style={styles.text}>Avez-vous un régime alimentaire ? </Text>

      <ScrollView contentContainerStyle={styles.contentContainer}>
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
  text: {
    fontSize: 20,
    marginBottom: 20,
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
    padding:10,
    paddingHorizontal:12,
    borderRadius: 100,
    position:"absolute",
    right:10,
    top:"10%",
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
    //backgroundColor: "#ffffff",
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
    width:65,
  },
});
