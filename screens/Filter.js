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

export default function Placard({ navigation }) {
  const [ingredient, setIngredient] = useState("");
  let [ingredientList, setIngredientList] = useState([]);

  function handleAdd() {
    setIngredientList([...ingredientList, ingredient]);
    setIngredient("");
  }

  function handleChange(value) {
    setIngredient(value);
  }
  function handleDelete(e) {
    // console.log(e);
    setIngredientList(ingredientList.filter((data) => data !== e));
  }
  //console.log(ingredientList);
  const displayedItems = ingredientList.map((e, i) => {
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
  //console.log(ingredientList);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.bigText}>
          <Text style={styles.bigTextContent}> Filter</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text>Ingredients</Text>
          {/* <Text>{count}</Text> */}
          <TextInput
            style={styles.inputText}
            placeholder="Add an ingredient"
            onChangeText={(value) => {
              handleChange(value);
            }}
            value={ingredient}
          ></TextInput>
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.8}
            onPress={() => handleAdd()}
          >
            <Text style={styles.textButton}>Add</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.displayedView}>{displayedItems}</ScrollView>

        <TouchableOpacity style={styles.findBtn} activeOpacity={0.8}>
          <Text style={styles.textButton}>Find a recipe</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {},
  inputContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 30,
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
    padding: 10,
    marginTop: 6,
    marginLeft: 15,
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
    height: "40%",
    backgroundColor: "rgba(146,195,188, 0.2)",
    width: "80%",
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