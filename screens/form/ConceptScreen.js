import { useSelector, useDispatch } from "react-redux";
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
import FormScreen from "./FormScreen";
import Homepage from "../Homepage";

import { login } from "../../reducers/users";

export default function ConceptScreen({ navigation }) {

  const dispatch = useDispatch();

  const token = useSelector((state) => state.users.value.token);

  
  const nextClick = () => {

    if(!token){
      navigation.navigate(FormScreen)
    }else{
      navigation.navigate(Homepage)
    }
   }

   //Si il ya un token on passe directement à la home 
   if(token){
    navigation.navigate(Homepage)
  }

  return (
    <ImageBackground
      source={require("../../assets/background-concept.jpg")}
      style={styles.background}
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.container}
      >
        <Image
          source={require("../../assets/Munchbox-logo.jpg")}
          style={styles.logo}
        />

        <View>
          <Text style={styles.title}>
            No time to search for your next meal idea?
          </Text>
          <Text style={styles.text}>
          Get free access to Munchbox’s library
          of over 100, 000 recipes !  </Text>
          <Text style={styles.text}>Batch-cooking has never been easier
          with our  monthly meal planner!
          </Text>
          <TouchableOpacity activeOpacity={0.8} onPress={nextClick}>
            <FontAwesome
              name="chevron-circle-right"
              size={55}
              color={"#e8be4b"}
              style={styles.button}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  logo: {
    color: "#ffffff",
    fontSize: 30,
    backgroundColor: "#92C3BC",
    padding: 50,
    borderRadius: 100,
  },
  title: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 60,
  },
  button: {
    alignSelf: "flex-end",
  },

  logo: {
    width: "50%",
    height: "20%",
    borderRadius: 50,
    opacity: 0.9,
  },
});
