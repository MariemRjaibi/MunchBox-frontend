import { useState, useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Pressable,
  Keyboard,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SliderPicker } from "react-native-slider-picker";
//Reducer imports

import { useDispatch, useSelector } from "react-redux";
import {
  addIngredients,
  addAllergies,
  updatePescto,
  updateOmnivore,
  updateVegan,
  updateglutenfree,
  updatelactosefree,
  removeAllergies,
  removeIngredients,
} from "../reducers/modalFilters";
import Recettepage from "./Recettepage";

export default function Placard() {
  //Dispatch info to reducer
  const dispatch = useDispatch();
  //Read reducer info
  const ingredientList = useSelector(
    (state) => state.modalFilters.value.ingredients
  );
  const allergiesList = useSelector(
    (state) => state.modalFilters.value.allergies
  );
  // const dietFromReducer = useSelector((state) => state.modalFilters.value.diet);
  // console.log(dietFromReducer);

  const [ingredient, setIngredient] = useState("");

  const [allergie, setAllergie] = useState("");

  const [pescto, setPescto] = useState(false);
  const [omnivore, setOmnivore] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [lactoseFree, setLactoseFree] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);

  //switching colors in Diet
  const inactivecColor = "rgba(146,195,188, 0.1)";
  const activeColor = "rgba(146,195,188, 0.5)";

  //dispatch info to reducers (ingredients & allergies)
  function handleAddIngredients() {
    console.log("clicked");
    dispatch(addIngredients(ingredient));
    setIngredient("");
  }
  function handleAddAllergies() {
    dispatch(addAllergies(allergie));
    setAllergie("");
  }

  // set values of inputs
  function handleChangeIngredients(value) {
    setIngredient(value);
  }
  function handleChangeAllergies(value) {
    setAllergie(value);
  }

  //dispatch the remove function of the reducer
  function handleDeleteIngredients(e) {
    dispatch(removeIngredients(e));
  }
  function handleDeleteAllergies(e) {
    dispatch(removeAllergies(e));
  }

  const displayedItems = ingredientList.map((e, i) => {
    return (
      <View key={i} style={styles.item}>
        <Text style={styles.list}>{e}</Text>
        <FontAwesome
          name="times"
          size={20}
          color="#92C3BC"
          style={styles.deleteIcon}
          onPress={() => handleDeleteIngredients(e)}
        />
      </View>
    );
  });
  const displayedAllergiesItems = allergiesList.map((e, i) => {
    return (
      <View key={i} style={styles.item}>
        <Text style={styles.list}>{e}</Text>
        <FontAwesome
          name="times"
          size={20}
          color="#92C3BC"
          style={styles.deleteIcon}
          onPress={() => handleDeleteAllergies(e)}
        />
      </View>
    );
  });
  function handlePressPescto() {
    setPescto((current) => !current);
  }
  function handleValidation() {
    navigation.navigate("Recettepage");
    dispatch(updatePescto(pescto));
    dispatch(updateOmnivore(omnivore));
    dispatch(updateVegan(vegan));
    dispatch(updatelactosefree(lactoseFree));
    dispatch(updateglutenfree(glutenFree));
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.inputContainer}>
            {displayedItems.length === 0 ? (
              <Text style={styles.textTitle}>Ingredients</Text>
            ) : (
              <Text style={styles.textTitle}>
                Ingredients: {displayedItems.length}
              </Text>
            )}
            <View style={styles.searchBar}>
              <TextInput
                style={styles.inputText}
                placeholder="Add an ingredient"
                onChangeText={(value) => {
                  handleChangeIngredients(value);
                }}
                value={ingredient}
              ></TextInput>
              <TouchableOpacity
                style={styles.addBtn}
                activeOpacity={0.8}
                onPress={() => handleAddIngredients()}
              >
                <Text style={styles.textButton}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={styles.displayedView}>{displayedItems}</ScrollView>

          <Text style={styles.textTitle}> Diet </Text>
          <View style={styles.dietElements}>
            <Pressable
              style={styles.dietItem}
              backgroundColor={pescto ? activeColor : inactivecColor}
              onPress={() => handlePressPescto()}
            >
              <Image
                style={styles.imgAvatar}
                source={require("../assets/icon/fish.png")}
              />
              <Text style={styles.textDiet}> Pescto</Text>
            </Pressable>
            <Pressable
              style={styles.dietItem}
              backgroundColor={omnivore ? activeColor : inactivecColor}
              onPress={() => setOmnivore((current) => !current)}
            >
              <Image
                style={styles.imgAvatar}
                source={require("../assets/icon/meat.png")}
              />
              <Text style={styles.textDiet}> Omnivore</Text>
            </Pressable>
            <Pressable
              style={styles.dietItem}
              backgroundColor={vegan ? activeColor : inactivecColor}
              onPress={() => setVegan((current) => !current)}
            >
              <Image
                style={styles.imgAvatar}
                source={require("../assets/icon/vegan.png")}
              />
              <Text style={styles.textDiet}> Vegan</Text>
            </Pressable>
            <Pressable
              style={styles.dietItem}
              backgroundColor={lactoseFree ? activeColor : inactivecColor}
              onPress={() => setLactoseFree((current) => !current)}
            >
              <Image
                style={styles.imgAvatar}
                source={require("../assets/icon/milk-bottle.png")}
              />
              <Text style={styles.textDiet}> Lactose-Free</Text>
            </Pressable>
            <Pressable
              style={styles.dietItem}
              backgroundColor={glutenFree ? activeColor : inactivecColor}
              onPress={() => setGlutenFree((current) => !current)}
            >
              <Image
                style={styles.imgAvatar}
                source={require("../assets/icon/grain.png")}
              />
              <Text style={styles.textDiet}> Gluten-Free</Text>
            </Pressable>
          </View>
          <View style={styles.sliderContainer}>
            <Text style={styles.textTitle}> Cooking time</Text>
            <SliderPicker
              minLabel={"15min"}
              midLabel={"30min"}
              maxLabel={"+1h"}
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
          <View style={styles.sliderContainer}>
            <Text style={styles.textTitle}> Preparation time</Text>
            <SliderPicker
              style={styles.slider}
              minLabel={"15min"}
              midLabel={"30min"}
              maxLabel={"+1h"}
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
          <View style={styles.inputContainerAllergies}>
            {displayedAllergiesItems.length === 0 ? (
              <Text style={styles.textTitle}>Allergies</Text>
            ) : (
              <Text style={styles.textTitle}>
                Allergies: {displayedAllergiesItems.length}
              </Text>
            )}

            <View style={styles.searchBar}>
              <TextInput
                style={styles.inputText}
                placeholder="Add an allergie"
                onChangeText={(value) => {
                  handleChangeAllergies(value);
                }}
                value={allergie}
              ></TextInput>

              <TouchableOpacity
                style={styles.addBtn}
                activeOpacity={0.8}
                onPress={() => handleAddAllergies()}
              >
                <Text style={styles.textButton}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.displayedView}>
            {displayedAllergiesItems}
          </ScrollView>
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.8}
            onPress={() => handleValidation()}
          >
            <Text style={styles.textButton}>Ok</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },

  inputContainer: {
    // flexDirection: "row",
    alignItems: "center",
    marginTop: "20%",
    marginBottom: 30,
  },
  inputContainerAllergies: {
    alignItems: "center",

    marginBottom: 30,
  },
  searchBar: {
    flexDirection: "row",
  },
  inputText: {
    width: 270,
    padding: 10,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#E9E9E9",
    borderRadius: 100,
    fontSize: 14,
  },
  addBtn: {
    backgroundColor: "#F9D77E",
    borderRadius: 20,
    width: 50,
    fontSize: 14,
    height: 50,
    //  padding: 10,
    // marginTop: 6,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  bigText: {
    alignItems: "center",
    marginTop: 30,
  },
  bigTextContent: {
    fontSize: 25,
  },
  findBtn: {
    backgroundColor: "#F9D77E",
    borderRadius: 20,
    width: 200,
    fontSize: 14,
    padding: 10,
    marginTop: 6,
    marginLeft: 15,
    marginBottom: 30,
    marginTop: 30,
    alignItems: "center",
  },
  displayedView: {
    backgroundColor: "rgba(146,195,188, 0.2)",
    width: "80%",
    borderRadius: 20,
    alignItem: "center",
    marginBottom: "15%",
  },
  list: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteIcon: {
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  imgAvatar: {
    width: 40,
    height: 40,
    marginTop: 30,
  },
  dietElements: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "50%",
    marginTop: "5%",
    justifyContent: "space-evenly",
  },
  dietItem: {
    alignItems: "center",
    borderRadius: 20,
    // backgroundColor: "rgba(146,195,188, 0.1)",
    height: "40%",
    width: "40%",
    marginBottom: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.84,
    elevation: 5,
  },
  textTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  sliderContainer: {
    alignItems: "center",
    marginBottom: "20%",
  },
});
