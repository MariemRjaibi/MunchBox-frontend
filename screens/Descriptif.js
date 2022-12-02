import { useState, useEffect } from "react";

import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Recettepage from "./Recettepage";
import FavoritesScreen from "./FavoritesScreen";
import SwitchSelector from "react-native-switch-selector";
import { useSelector } from "react-redux";

export default function Descriptif({ route, navigation }) {
  const [isActive, setIsActive] = useState(true);
  const [calories, setCalories] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [displayedSteps, setDisplayedSteps] = useState([]);
  const fromRecetteScreen = useSelector((state) => state.fromWhichScreen.value);

  useEffect(() => {
    let data = route.params;
    //  console.log("data", typeof data);

    if (data.summary[data.summary.indexOf("calories") - 4] === ">") {
      setCalories(
        data.summary[data.summary.indexOf("calories") - 3] +
          data.summary[data.summary.indexOf("calories") - 2] +
          data.summary[data.summary.indexOf("calories") - 1]
      );
    } else {
      setCalories(
        data.summary[data.summary.indexOf("calories") - 4] +
          data.summary[data.summary.indexOf("calories") - 3] +
          data.summary[data.summary.indexOf("calories") - 2] +
          data.summary[data.summary.indexOf("calories") - 1]
      );
    }

    setPrepTime(data.readyInMinutes);

    //return the ingredients array in the modal
    let newIngredients = [];
    data.extendedIngredients.forEach(function (element) {
      newIngredients.push(element.name);
    });
    setIngredientsList([...ingredientsList, ...newIngredients]);

    // the steps to display
    let steps = [];
    //console.log(data.analyzedInstructions[0].steps);
    data.analyzedInstructions[0].steps.forEach(function (element) {
      steps.push(element.step);
    });
    setDisplayedSteps([...displayedSteps, ...steps]);
  }, []);

  function handlePressSwitcher() {
    setIsActive((current) => !current);
  }

  const newIngredientsArray = Array.from(ingredientsList).map((data, i) => {
    return (
      <View key={i}>
        <Text style={styles.ingredientsarray}>• {data}</Text>
      </View>
    );
  });
  const newStepsArray = displayedSteps.map((data, i) => {
    return (
      <View key={i}>
        <Text style={styles.stepsarray}>• {data}</Text>
      </View>
    );
  });

  function handleClose() {
    if (fromRecetteScreen) {
      navigation.navigate(Recettepage);
    } else {
      navigation.navigate(FavoritesScreen);
    }
  }

  return (
    <View style={styles.modalContainer}>
      <View style={styles.scrollview}>
        <Image source={{ uri: route.params.image }} style={styles.chicken} />
        <Ionicons
          name="close"
          size={35}
          color="#dedede"
          style={styles.close}
          onPress={() => handleClose()}
        />

        <Text style={styles.title}>{route.params.title}</Text>
        <View style={styles.input}>
          <FontAwesome
            name="clock-o"
            size={25}
            color="#92C3BC"
            style={styles.icons}
          />
          <Text>{prepTime} mins</Text>
          <Ionicons
            name="barbell"
            size={25}
            color="#92C3BC"
            style={styles.icons}
          />
          <Text>{calories} kcal</Text>
        </View>
        <SwitchSelector
          buttonColor={"#92C3BC"}
          ios_backgroundColor={"#92C3BC"}
          hasPadding
          style={{ marginTop: 20 }}
          initial={0}
          onPress={() => handlePressSwitcher()}
          options={[
            { label: "Ingredients", value: "ingredients" },
            { label: "Steps", value: "steps" },
          ]}
        />
        <ScrollView>
          {isActive ? newIngredientsArray : newStepsArray}

          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Nutrition Information
          </Text>

          <View style={styles.containeNutrition}>
            <View>
              <Text style={styles.textNutrition}>Glucide</Text>
              <View style={styles.infoContainer}>
                <Image
                  style={styles.info}
                  source={require("../assets/icon/les-glucides.png")}
                />
              </View>
              <Text style={styles.grammeNutrition}>58 g</Text>
            </View>

            <View>
              <Text style={styles.textNutrition}>Lipides</Text>

              <View style={styles.infoContainer}>
                <Image
                  style={styles.info}
                  source={require("../assets/icon/grain.png")}
                />
              </View>

              <Text style={styles.grammeNutrition}>11 g</Text>
            </View>

            <View>
              <Text style={styles.textNutrition}>Proteins</Text>
              <View style={styles.infoContainer}>
                <Image
                  style={styles.info}
                  source={require("../assets/icon/proteine.png")}
                />
              </View>
              <Text style={styles.grammeNutrition}>22 g</Text>
            </View>

            <View>
              <Text style={styles.textNutrition}>Fibres</Text>
              <View style={styles.infoContainer}>
                <Image
                  style={styles.info}
                  source={require("../assets/icon/gras-trans.png")}
                />
              </View>
              <Text style={styles.grammeNutrition}>28 g</Text>
            </View>

            <View>
              <Text style={styles.textNutrition}>Sale</Text>
              <View style={styles.infoContainer}>
                <Image
                  style={styles.info}
                  source={require("../assets/icon/sel.png")}
                />
              </View>
              <Text style={styles.grammeNutrition}>408 kcal</Text>
            </View>
          </View>
          {/* <Text style={{ fontWeight: "bold" }}>Read Reviews</Text> */}
          <Text style={{ fontWeight: "bold" }}>
            Rate this recipe:{" "}
            <FontAwesome
              name="star-o"
              size={20}
              color="#92C3BC"
              style={styles.note}
            />
            <FontAwesome
              name="star-o"
              size={20}
              color="#92C3BC"
              style={styles.note}
            />
            <FontAwesome
              name="star-o"
              size={20}
              color="#92C3BC"
              style={styles.note}
            />
            <FontAwesome
              name="star-o"
              size={20}
              color="#92C3BC"
              style={styles.note}
            />
            <FontAwesome
              name="star-o"
              size={20}
              color="#92C3BC"
              style={styles.note}
            />
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="Share your review with us..."
              style={styles.text}
            />
            <Pressable style={styles.submit}>
              <Ionicons
                name="send-outline"
                size={23}
                color="#FAD874"
                style={styles.iconsend}
              />
            </Pressable>
          </View>
          <Text style={styles.warning}>
            Experiencing an issue with the mobile site?
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 45,
    paddingHorizontal: 20,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeText: {
    color: "#83C5BC",
    fontWeight: "bold",
    fontSize: 30,
  },
  tagline: {
    color: "#ABAEB1",
    fontSize: 16,
  },
  containerIconUser: {
    // backgroundColor: "#92C3BC",
    // padding: 5,
    // justifyContent:"center",
    // width: 40,
    // height: 40,
    // borderRadius: 100,
  },
  iconUser: {
    textAlign: "center",
  },
  imageProfil: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#83C5BC",
  },

  containerNumberRecipes: {
    flexDirection: "row",
    alignItems: "flex-start",
    //justifyContent:"center",
    marginBottom: 10,
  },
  textNumberRecipes: {
    fontSize: 18,
  },
  numberRecipe: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#83C5BC",
  },
  containerFilter: {
    flexDirection: "row",
    marginBottom: 30,
  },
  filterIcon: {
    backgroundColor: "#FFD87D",
    padding: 5,
    paddingHorizontal: 8,
    marginRight: 10,
    borderRadius: 100,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
    //borderTopRightRadius: 30,
    //borderTopLeftRadius: 30,
  },
  contentScroll: {
    //height: 25,
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-evenly",
    //marginBottom: 30,
  },
  menuBtn: {
    paddingHorizontal: 20,
    backgroundColor: "#83C5BC",
    marginHorizontal: 5,
    borderRadius: 20,
    //borderBottomWidth: 2,
    // borderBottomColor: "#92C3BC",
  },
  menuBtnText: {
    fontSize: 16,
    paddingBottom: 5,
    color: "#ffffff",
  },
  containerRecipes: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  cardRecipe: {
    backgroundColor: "rgba(255, 216, 125, 0.3)",
    marginHorizontal: 5,
    paddingBottom: 10,
    borderRadius: 15,
    height: "auto",
    marginBottom: 20,
  },
  cardTitle: {
    paddingVertical: 10,
    fontWeight: "500",
    paddingLeft: 5,
    width: 150,
  },
  imageRecipe: {
    width: 150,
    height: 150,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  cardInfo: {
    paddingHorizontal: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  containerInfo: {
    flexDirection: "row",
  },
  textInfo: {
    paddingLeft: 5,
    fontSize: 12,
  },
  iconHeart: {
    position: "absolute",
    top: 15,
    right: 10,
  },

  //modal style
  warning: {
    fontWeight: "200",
    textAlign: "center",
    fontSize: 12,
  },
  containeNutrition: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  textNutrition: {
    fontSize: 12,
    textAlign: "center",
    paddingBottom: 5,
  },
  grammeNutrition: {
    paddingTop: 4,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
  },
  chicken: {
    width: "100%",
    height: "30%",
    borderRadius: 30,
    marginTop: 30,
  },
  close: {
    position: "absolute",
    top: 40,
    right: 40,
    color: "white",
    backgroundColor: "rgba(0,0,0, 0.3)",
    padding: 7,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  heart: {
    position: "absolute",
    top: 50,
    right: 60,
    color: "red",
  },
  // container: {
  //    backgroundColor: "white",
  //    alignItems: "center",
  // },
  modalContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFF4CF",
  },
  scrollview: {
    flex: 1,
    backgroundColor: "#FFF4CF",
    paddingBottom: 20,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginRight: 15,
  },
  icons: {
    paddingRight: 5,
    paddingLeft: 30,
  },
  star: {
    marginTop: 20,
    flexDirection: "row",
  },
  starnote: {
    paddingLeft: 80,
  },
  ingredient: {
    marginTop: 30,
  },
  infoContainer: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.24,
    elevation: 3,
  },
  info: {
    width: 35,
    height: 35,
  },
  text: {
    backgroundColor: "white",
    padding: 2,
    marginTop: 30,
    width: "80%",
    borderColor: "#E9E9E9",
    borderRadius: 5,
    fontSize: 14,
    marginBottom: 50,
    paddingLeft: 10,
  },
  submit: {
    backgroundColor: "#92C3BC",
    width: 40,
    height: 35,
    borderRadius: 5,
    marginTop: 30,
    alignItems: "center",
    paddingLeft: 5,
  },
  iconsend: {
    paddingTop: 3,
  },
  modalView: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  stepsarray: {
    color: "#343333",
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginTop: 20,
    //paddingBottom: 10,
  },
  ingredientsarray: {
    color: "#343333",
    fontWeight: "bold",
    //paddingBottom: 10,
    paddingTop: 10,
    marginRight: 70,
    justifyContent: "flex-start",
  },
});
