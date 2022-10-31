import { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

import { SliderPicker } from "react-native-slider-picker";

export default function LevelScreen({ navigation }) {

  const[kitchenLevel, setKitchenLevel] = useState(0);

  const levelClick = (position) =>{
    setKitchenLevel({value: position})
    console.log("level : ",kitchenLevel)
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Kitchen level</Text>
        <Text style={styles.text}>
          Quel est ton degré de maitrise en cuisine ?{" "}
        </Text>
        <SliderPicker
         
          minLabel={"Débutant"}
          midLabel={"Commis"}
          maxLabel={"Etchebest"}
          defaultValue={1}
          maxValue={2}
          callback={levelClick}
          //   callback={position => {
          //     this.setState({ value: position });
          //   }}
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
        <Text style={styles.title}>cooking time</Text>
        <Text style={styles.text}>Do you have time to cook?</Text>
        <SliderPicker
          minLabel={"Bof"}
          midLabel={"Moyen"}
          maxLabel={"Carrément"}
          defaultValue={1}
          maxValue={2}
          //   callback={position => {
          //     this.setState({ value: position });
          //   }}
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
    fontWeight:"bold",
    color:"#92C3BC",
    //marginBottom: 15,
  },
  text: {
    fontSize: 20,
    marginBottom: 50,
  },
});
