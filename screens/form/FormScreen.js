import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import { useDispatch } from 'react-redux';
import { addPreference } from '../../reducers/filters';


import FontAwesome from "react-native-vector-icons/FontAwesome";

// Screens du formulaire
import FamilynumberScreen from "./FamilynumberScreen";
import AllergieScreen from "./AllergiesScreen";
import PreferencesScreen from "./PreferencesScreen";
import LevelScreen from "./LevelScreen";

// Navigaton page suivante
import SignupScreen from "../SignupScreen";




export default function FormScreen({ navigation }) {

  const dispatch = useDispatch();

  // Etat pour récupérer les données du formulaire
  const [formData, setFormData] = useState({
    // Family number
    numberAdult: 0,
    numberChildren: 0,

     //Food preference
     regime: [],
    
    // Allergies
    allergies: [],
    allergiesOption: [],

  });

  

  const [screen, setscreen] = useState(0);

  const ScreenDisplay = () => {
    if (screen === 0) {
      return (
        <FamilynumberScreen  formData={formData} setFormData={setFormData} />
      );
    } else if (screen === 1) {

      return (
       // < AsupScreen formData={formData} setFormData={setFormData} />
        <PreferencesScreen formData={formData} setFormData={setFormData} />
      ) 
     
    } else if (screen === 2) {
      return ( 
        <AllergieScreen formData={formData} setFormData={setFormData} />     
      );
    } else {
      return <LevelScreen formData={formData} setFormData={setFormData} />;
    }
  };

  // onPress={() => console.log("next")}

  // Bouton suivant et soumettre 
  function handlePress() {
    console.log("Info :", formData)
    if(screen === 3){
      //console.log("Info :", formData)
      dispatch(addPreference(formData))
      navigation.navigate(SignupScreen)
    }else{
      setscreen((currScreen) => currScreen + 1)
    }           
  }

  const iconBtnNext =  <FontAwesome name="chevron-circle-right" size={55} color={"#e8be4b"} style={styles.buttonNext}/>;
  const iconBtnReturn = <FontAwesome name="chevron-left" size={20} color={"#92C3BC"} style={styles.buttonReturn}/>;
  const textBtnSubmit = <Text style={styles.btnSubmit}>Let's cook</Text>;
  return (
    <View style={styles.container}>

      <View style={styles.main}>

        <View style={styles.header}>
          <Pressable style={styles.btnNext} disabled={screen === 0} onPress={() => setscreen((currScreen) => currScreen - 1)}>
            <Text>{screen === 0  ? " " : iconBtnReturn}</Text>
          </Pressable>
          <Text style={styles.textHeader}>kitchen preference</Text>
        </View>
       

        <View>
          {ScreenDisplay()}
        </View>
        
        </View>

      <View style={styles.btnContainer}>
        <Pressable onPress={() => handlePress()}>
          <Text >{screen === 3  ? textBtnSubmit : iconBtnNext}</Text> 
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // display: "flex",
    //flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    width: "100%",
    height: "100%",
    backgroundColor: "#FBFBFB",
    justifyContent: "space-between",
  },
  main:{
    //backgroundColor:"pink",
  },
  header:{
    flexDirection:"row",
    marginBottom: 20,
    //backgroundColor:"#FFD87D",
    //justifyContent:"space-between",
  },
  btnNext:{
   //alignSelf:"flex-start",
  },
  textHeader:{
   marginLeft:"30%",
   color:"#2E516A",
  },
  btnContainer: {
    // flexDirection: "row",
    // alignItems: "flex-end",
    marginBottom: 50,
  },
  buttonNext: {
   justifyContent:'flex-end',
  },
  btnSubmit:{
    backgroundColor: "#e8be4b",
    color:"#fff",
    fontSize: 30,
    paddingHorizontal:40,
  },
  
});
