import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";


import { SliderPicker } from "react-native-slider-picker";

export default function LevelScreen({ navigation }) {
  const [kitchenLevel, setKitchenLevel] = useState(0);

  const levelClick = (position) => {
    setKitchenLevel({ value: position });
    console.log("level : ", kitchenLevel);
  };

  return (
    <View style={styles.container}>
      

        <View>
          <Text style={styles.title}>🧑‍🍳 Kitchen level</Text>
          <Text style={styles.text}>
          How do you rate yourself in the kitchen ?{" "}
          </Text>
          <SliderPicker
            minLabel={"Beginner"}
            midLabel={"Average"}
            maxLabel={"Etchebest"}
            defaultValue={1}
            maxValue={2}
            callback={levelClick}
            labelFontColor={"#92C3BC"}
            labelFontWeight={"400"}
            labelFontSize={15}
            showFill={true}
            fillColor={"#92c3bc"}
            showSeparatorScale={true}
            buttonBackgroundColor={"#fff"}
            buttonBorderColor={"#92C3BC"}
            buttonBorderWidth={1}
            scaleNumberFontWeight={"300"}
            buttonDimensionsPercentage={6}
          />
        </View>

        <View>
          <Text style={styles.title}>🍲 Cooking time</Text>
          <Text style={styles.text}>Do you have time to cook?</Text>
          <SliderPicker
            minLabel={"Not at all"}
            midLabel={"A bit of time"}
            maxLabel={"Absolutely"}
            defaultValue={1}
            maxValue={2}
            labelFontColor={"#92C3BC"}
            labelFontWeight={"400"}
            labelFontSize={15}
            showFill={true}
            fillColor={"#92c3bc"}
            showSeparatorScale={true}
            buttonBackgroundColor={"#fff"}
            buttonBorderColor={"#92C3BC"}
            buttonBorderWidth={1}
            scaleNumberFontWeight={"300"}
            buttonDimensionsPercentage={6}
          />
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#92C3BC",
    //marginBottom: 15,
  },
  text: {
    fontSize: 20,
    marginBottom: 50,
  },
});
