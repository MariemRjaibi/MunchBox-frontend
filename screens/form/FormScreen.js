import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import FamilynumberScreen from "./FamilynumberScreen";
import AllergieScreen from "./AllergiesScreen";
import PreferencesScreen from "./PreferencesScreen";
import LevelScreen from "./LevelScreen";
import SignupScreen from "../SignupScreen";

export default function FormScreen({ navigation }) {
  const [formData, setFormData] = useState({
    // Family number
    NumberAdult: "",
    numberChildren: "",

    // Allergies
    regime: "",
    optionAllergies: "",

    //Food preference
    preference: "",
    optionPreference: "",
  });

  const [screen, setscreen] = useState(0);

  const ScreenDisplay = () => {
    if (screen === 0) {
      return (
        <FamilynumberScreen formData={formData} setFormData={setFormData} />
      );
    } else if (screen === 1) {
      return <AllergieScreen formData={formData} setFormData={setFormData} />;
    } else if (screen === 2) {
      return (
        <PreferencesScreen formData={formData} setFormData={setFormData} />
      );
    } else {
      return <LevelScreen formData={formData} setFormData={setFormData} />;
    }
  };

  // onPress={() => console.log("next")}

  // Bouton suivant et soumettre 
  function handlePress() {
    if(screen === 3){
      console.log("hello")
      navigation.navigate(SignupScreen)
    }else{
      setscreen((currScreen) => currScreen + 1)
    }           
  }

  const iconBtnNext =  <FontAwesome name="chevron-circle-right" size={55} color={"#e8be4b"} style={styles.buttonNext}/>;
  const iconBtnReturn = <FontAwesome name="arrow-left" size={20} color={"#e8be4b"} style={styles.buttonReturn}/>;
  const textBtnSubmit = <Text style={styles.btnSubmit}>Let's cook</Text>;
  return (
    <View style={styles.container}>

      <View>

        <Pressable disabled={screen === 0} onPress={() => setscreen((currScreen) => currScreen - 1)}>
          <Text>{screen === 0  ? " " : iconBtnReturn}</Text>
        </Pressable>

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
