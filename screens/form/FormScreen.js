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

    // Sing in & sing up
    name: "",
    email: "",
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
  function handlePress() {
    for (let screen = 0; screen < 2; screen++) {
      if (screen === screen.length) {
        console.log(formData);
      } else {
        setscreen((currScreen) => currScreen + 1);
      }
      {
        /* <Text>{screen === screen.length - 1 ? "Submit" : "Next"}</Text> */
      }
    }
  }

  return (
    <View style={styles.container}>
      <View>{ScreenDisplay()}</View>

      <View style={styles.btnContainer}>
        <Pressable
          disabled={screen === 0}
          onPress={() => setscreen((currScreen) => currScreen - 1)}
        >
          <FontAwesome
            name="arrow-left"
            size={55}
            color={"#e8be4b"}
            style={styles.buttonNext}
          />
        </Pressable>
        <Pressable onPress={() => handlePress()}>
          <FontAwesome
            name="chevron-circle-right"
            size={55}
            color={"#e8be4b"}
            style={styles.buttonNext}
          />
        </Pressable>
        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate(SignupScreen)}
        >
          <Text style={styles.textButton}>Let's go !</Text>
        </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 50,
  },
});