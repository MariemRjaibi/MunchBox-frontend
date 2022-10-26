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

export default function FamilynumberScreen({ formData, setFormData }) {
  //prop form
  // NumberAdult:"",
  // numberChildren: "",

  // Compteur adulte
  const [counterAdult, setCounterAdult] = useState(0);

  const counterClickPlus = () => {
    setCounterAdult(counterAdult + 1);
  };

  const counterClickmoins = () => {
    if (counterAdult > 0) {
      setCounterAdult(counterAdult - 1);
    }
  };

   // Compteur enfant
  const [counterChild, setCounterChild] = useState(0);

  const counterPlusChildClick = () => {
    setCounterChild(counterChild + 1);
  };

  const counterPlusChildMoins = () => {
    if (counterAdult > 0) {
      setCounterChild(counterChild - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>Family Numbers</Text>
        <Text style={styles.subTitle}>How many family members?</Text>
      </View>

      <View style={styles.mainChoise}>
        <View style={[styles.containerChoice, styles.FirstcontainerChoice]}>
          <Text style={styles.titleChoice}>Adults</Text>
          <Image
            style={styles.imgAvatar}
            source={require("../../assets/icon/homme.png")}
          />
          <View style={styles.containerCounter}>
            <FontAwesome
              name="minus"
              size={10}
              color={"#92C3BC"}
              onPress={() => counterClickmoins()}
              style={styles.btnCounter}
            />
            <Text style={styles.txtCounter}>{counterAdult}</Text>
            <FontAwesome
              name="plus"
              size={10}
              color={"#92C3BC"}
              onPress={() => counterClickPlus()}
              style={styles.btnCounter}
            />
          </View>
        </View>

        <View style={styles.containerChoice}>
          <Text style={styles.titleChoice}>Children</Text>
          <Image
            style={styles.imgAvatar}
            source={require("../../assets/icon/garcon.png")}
          />
          <View style={styles.containerCounter}>
            <FontAwesome
              name="minus"
              size={10}
              color={"#92C3BC"}
              onPress={() => counterPlusChildMoins()}
              style={styles.btnCounter}
            />
            <Text style={styles.txtCounter}>{counterChild}</Text>
            <FontAwesome
              name="plus"
              size={10}
              color={"#92C3BC"}
              onPress={() => counterPlusChildClick()}
              style={styles.btnCounter}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    height: "75%",
  },
  head: {
    marginBottom: 30,
  },
  title: {
    fontSize: 35,
  },
  subTitle: {
    fontSize: 20,
  },
  mainChoise: {
    flexDirection: "row",
    justifyContent: "center",
  },
  containerChoice: {
    alignItems: "center",
  },
  titleChoice: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  FirstcontainerChoice: {
    marginRight: 40,
  },
  containerCounter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 130,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.24,
    elevation: 3,
  },
  btnCounter: {
    fontSize: 20,
  },
  txtCounter: {
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 15,
    color: "#92C3BC",
  },
  btnSimple: {
    backgroundColor: "#e8be4b",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 100,
    alignSelf: "center",
  },
  imgAvatar: {
    width: 100,
    height: 100,
    backgroundColor: "rgba(146, 195, 188, 0.3)",
    borderRadius: 100,
    padding: 0,
  },
});
