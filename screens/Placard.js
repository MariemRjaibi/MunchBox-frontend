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
} from "react-native";
import { Keyboard } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import {
  addPlacardIngredients,
  removePlacardIngredients,
} from "../reducers/placardIngredients";

export default function Placard({ navigation }) {
  // ======= Bouton retour  =======//
  const goBack = () => {
    navigation.goBack();
  };

  const ingredientsToDisplay = useSelector((state) => {
    // console.log("looooog", state);
    //console.log(state.placardIngredients.value);
    return state.placardIngredients.value;
  });
  const isFiltered = useSelector((state) => state.choosePaths.value);
  console.log("placard", isFiltered);
  // console.log(ingredientsToDisplay);
  const dispatch = useDispatch();
  const [littleIngredient, setIngredient] = useState("");
  //let [ingredientList, setIngredientList] = useState([]);

  function handleAdd() {
    dispatch(addPlacardIngredients(littleIngredient));
    setIngredient("");
  }

  function handleChange(value) {
    setIngredient(value);
  }
  function handleDelete(e) {
    dispatch(removePlacardIngredients(e));
  }
  //console.log("hello hesre", ingredientsToDisplay);
  //const hello = [1, 2, 3];
  const displayedItems = ingredientsToDisplay.map((e, i) => {
    return (
      <View style={styles.item}>
        <Text key={i} style={styles.list}>
          {e}
        </Text>
        <FontAwesome
          name="times"
          size={20}
          color="#92C3BC"
          style={styles.deleteIcon}
          onPress={() => handleDelete(e)}
        />
      </View>
    );
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.bigText}>
          <FontAwesome
            name="chevron-left"
            size={20}
            color={"#92C3BC"}
            style={styles.buttonReturn}
            onPress={goBack}
          />
          <Text style={styles.bigTextContent}> What I have in my kitchen</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Add an ingredient"
            onChangeText={(value) => {
              handleChange(value);
            }}
            value={littleIngredient}
          ></TextInput>
          <FontAwesome
            name="plus"
            size={20}
            color={"#ffffff"}
            onPress={() => handleAdd()}
            style={styles.btnPlus}
          />
          {/* <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.8}
            onPress={() => handleAdd()}
          >
            <Text style={styles.textButton}>Add</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.containerMain}>
          <ScrollView style={styles.displayedView}>{displayedItems}</ScrollView>

          <TouchableOpacity
            style={styles.findBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("TabNavigator")}
          >
            <Text style={styles.textButton}>Find a recipe</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    //alignItems: "center",
    //justifyContent: "center",
  },
  containerMain: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  searchBar: {},
  inputContainer: {
    marginTop: 10,
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
  btnPlus: {
    backgroundColor: "#e8be4b",
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 100,
    right: 50,
    top: 3,
  },
  addBtn: {
    backgroundColor: "#F9D77E",
    borderRadius: 20,
    width: 50,
    fontSize: 14,
    padding: 10,
    marginTop: 6,
    marginLeft: 15,
  },
  bigText: {
    //alignItems: "center",
    marginTop: 40,
  },
  bigTextContent: {
    color: "#83C5BC",
    fontWeight: "bold",
    marginTop: 15,
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
    marginTop: 20,
    height: "40%",
    backgroundColor: "rgba(146,195,188, 0.2)",
    width: "100%",
    borderRadius: 20,
    alignItem: "center",
  },
  list: {
    paddingLeft: 20,
    paddingTop: 30,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteIcon: {
    paddingRight: 20,
    paddingTop: 30,
  },
});
