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
import Ionicons from "react-native-vector-icons/Ionicons";
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
import Placard from "./Placard";
import Homepage from "./Homepage";

export default function Filter({ navigation }) {
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
  const inactivecColor = "#ffffff";
  const activeColor = "#E8F4F5";

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
    navigation.navigate("TabNavigator");
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
        <View style={styles.head}>
        <Text style={styles.title}>Filtres</Text>
          <Ionicons // closes the filter and return to Recettepage
            name="close"
            size={35}
            color="#dedede"
            style={styles.close}
            onPress={() => navigation.navigate("TabNavigator")}
          />

        </View>
        
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
                {/* <Text style={styles.textButton}>Add</Text> */}
                <FontAwesome
            name="plus"
            size={20}
            color={"#ffffff"}
           
           
          />
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
                <FontAwesome
            name="plus"
            size={20}
            color={"#ffffff"}
           
           
          />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.displayedView}>
            {displayedAllergiesItems}
          </ScrollView>

          <View  style={styles.containBtnValided}>
            <TouchableOpacity
              style={styles.btnValided}
              activeOpacity={0.8}
              onPress={() => handleValidation()}
            >
              <Text style={styles.textBtnValided}>Ok 🧑‍🍳</Text>
            </TouchableOpacity>

          </View>
         


        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB",
    paddingTop: 45,
    paddingHorizontal: 20,
    paddingBottom:50,
    //alignItems: "center",
    //justifyContent: "center",
  },
  head:{
    flexDirection:"row",
    justifyContent:"space-between",
  },
  close: {
    color: "#92C3BC",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#92C3BC",
    marginBottom: 25,
  },

  inputContainer: {
    //flexDirection: "row",
   // alignItems: "center",
    //marginTop: "20%",
    //marginBottom: 30,
  },
  inputContainerAllergies: {
   // alignItems: "center",
    marginBottom: 30,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputText: {
    width: "100%",
    padding: 10,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#E9E9E9",
    borderRadius: 100,
    fontSize: 14,
  },
  addBtn: {
    backgroundColor: "#e8be4b",
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 100,
    right: 50,
    top: 3,
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
    width: "100%",
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
    width: 30,
    height: 30,
  },
  dietElements: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 50,
    justifyContent: "space-evenly",
  },
  dietItem: {
    alignItems: "center",
    borderRadius: 20,
    paddingVertical:15,
    height: "30%",
    width: "34%",
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
    marginBottom: 30,
  },
  containBtnValided:{
   
    alignItems:"center",
  },
  btnValided:{
    
    backgroundColor: "#e8be4b",
    fontSize: 25,
    padding:10,
    paddingHorizontal:40,
    borderTopRightRadius:45,
    borderBottomLeftRadius:45,
    width:"50%",
  },
  textBtnValided:{
    color:'#fff',
    textAlign:"center",
  },
});
