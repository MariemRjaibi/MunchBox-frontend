import { useDeferredValue, useEffect, useState } from "react";
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

export default function BatchweekScreen() {
  const [calendarRecipesToDisplay, setCalendarRecipesToDisplay] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.10.158:3000/calendarRecipes`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.places);
        setCalendarRecipesToDisplay(data);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FontAwesome
        name="chevron-left"
        size={20}
        color={"#92C3BC"}
        style={styles.buttonReturn}
      />
      <Text style={styles.title}>Recipe list for the week</Text>
      <Text style={styles.dateBacth}>10 -17 septembre</Text>

      <View style={styles.containerInfo}>
        <View style={styles.infoBacth}>
          <FontAwesome
            name="clock-o"
            size={20}
            color={"#92C3BC"}
            style={styles.iconInfoBatch}
          />
          <Text style={styles.titleInfoBacth}>Total duration : </Text>
          <Text style={styles.dataInfoBacth}>2h30</Text>
        </View>
        <View style={styles.infoBacth}>
          <FontAwesome
            name="clock-o"
            size={20}
            color={"#92C3BC"}
            style={styles.iconInfoBatch}
          />
          <Text style={styles.titleInfoBacth}>Number of recipes : </Text>
          <Text style={styles.dataInfoBacth}>7</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.containerRecipes}>
        <Text style={styles.subTitle}>Lundi</Text>
        <View style={styles.descriptionRecipe}>
          <Image
            style={styles.imageRecipe}
            source={require("../assets/plat-2.jpg")}
          />
          <View style={styles.descriptionRecipeText}>
            <Text style={styles.titleRecipe}>Rice with pisckled shrimps</Text>
            <Text>
              Rice with Hind Siliguri shrimps blabla blabal blablabal with Hind
              Siliguri
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.containerBtn}>
        <TouchableOpacity style={styles.btnSubmit}>
          <Text>Validate my batch 👩🏽‍🍳</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#92C3BC",
    textAlign: "center",
  },
  dateBacth: {
    textAlign: "center",
    fontSize: 20,
  },
  containerRecipes: {
    marginTop: 25,
  },
  subTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    //color:"#ABAEB1",
  },
  imageRecipe: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  titleRecipe: {
    fontSize: 19,
    fontWeight: "bold",
  },
  descriptionRecipe: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 20,
  },
  descriptionRecipeText: {
    paddingTop: 10,
    paddingLeft: 20,
  },
  containerBtn: {
    alignItems: "center",
  },
  btnSubmit: {
    backgroundColor: "#FFD87D",
    padding: 10,
    borderBottomStartRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    width: "60%",
  },
  containerInfo: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoBacth: {
    flexDirection: "row",
  },
  iconInfoBatch: {
    paddingRight: 10,
  },
  dataInfoBacth: {
    color: "#92C3BC",
    fontWeight: "bold",
  },
});
