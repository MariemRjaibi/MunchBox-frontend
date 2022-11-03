import { useState, useEffect } from "react";
import Checkbox from "expo-checkbox";
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import BatchCalendar from "./BatchCalendar";

export default function ShoppinglistScreen({ navigation }) {
  // ======= Bouton retour  =======//
  const goBack = () => {
    navigation.goBack();
  };

  const token = useSelector((state) => state.users.value.token);
  const [optionsData, setOptionsData] = useState([]);

  // ======= Récuperer les recettes de calendar qui sont dans la base de données======= //

  let tmp = [];
  useEffect(() => {
    fetch(`http://192.168.10.178:3000/calendarRecipes/${token}`)
      .then((response) => response.json())
      .then((data) => {
        for (let element of data.recipes) {
          // console.log(element.ingredients);
          tmp.push(...element.ingredients);
        }
        // console.log( tmp);
        let filtered = tmp.filter((item, index) => tmp.indexOf(item) === index);

        setOptionsData(filtered);
      });
  }, []);
  //console.log(optionsData);
  // ======= Liste des courses entrées manuellement par l'utilisateur ======= //
  const [shopping, setShopping] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  // Récupérer et stocker les aliments écrit par l'utilisateur dans l'input
  const addIngredientPress = () => {
    //Afficer les aliments taper par l'utilisateur
    setShoppingList([...shoppingList, shopping]);
    setShopping("");
  };

  // Ajouter des aliments à la liste
  const listCoursesUser = shoppingList.map((data, i) => {
    // ===== CONFLIT AVEC L'AUTRE CHECKBOX
    //const [isCheckedUserList, setCheckedUserList] = useState(false);
    // value={isCheckedUserList}  onValueChange={ () => setCheckedUserList(current => !current)} color={isCheckedUserList ? "#92C3BC" : undefined}
    // console.log("========", data);
    return (
      <View key={i} style={styles.section}>
        <Checkbox style={styles.checkbox} />
        <Text style={styles.textOption}>{data}</Text>
      </View>
    );
  });

  // ======= Pour récupérer les données des ingrédients directement via les recettes ======= //
  //const [isChecked, setChecked] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const checkboxClick = (e) => {
    console.log(e);
    setChecked((current) => !current);
    //console.log("coucou");
  };
  // console.log(isChecked);
  const option = optionsData.map((data, i) => {
    return (
      <View key={i} style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={() => checkboxClick(data)}
          color={isChecked ? "#92C3BC" : undefined}
        />
        <View style={styles.containeDescriptionOption}>
          <Text style={styles.textOption}>{data}</Text>
        </View>
      </View>
    );
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.containerHead}>
        <View style={styles.backTitle}>
          <FontAwesome
            name="chevron-left"
            size={20}
            color={"#92C3BC"}
            style={styles.buttonReturn}
            onPress={goBack}
          />
          <Text style={styles.title}>Shopping list</Text>
        </View>

        <Text style={styles.subTitle}>What to buy for your next batch?</Text>
      </View>
      <View style={styles.containerInput}>
        <TextInput
          placeholder="What do you need?"
          onChangeText={(value) => setShopping(value)}
          value={shopping}
          style={styles.input}
        />
        <View>
          <FontAwesome
            name="plus"
            size={20}
            color={"#ffffff"}
            onPress={() => addIngredientPress()}
            style={styles.btnPlus}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.containerCheckbox}>
        <View>
          <Text style={styles.titleProduct}>Ingredients of the batch</Text>
          {option}
        </View>
        <View>
          <Text style={styles.titleProduct}>Plus </Text>
          {listCoursesUser}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "#FBFBFB",
    //justifyContent: "space-between",
    //   width: Dimensions.get('window') .width,
  },
  containerHead: {
    marginBottom: 20,
  },
  title: {
    marginLeft: "5%",
    fontSize: 30,
    fontWeight: "bold",
    color: "#92C3BC",
  },
  subTitle: {
    fontSize: 20,
    //marginBottom: 20,
    //color:"#ABAEB1",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
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
  titleProduct: {
    backgroundColor: "#FFD87D",
    padding: 6,
    paddingHorizontal: 20,
    width: "auto",
    borderRadius: 100,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  containerCheckbox: {
    marginBottom: 40,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
    width: 20,
    height: 20,
  },
  containeDescriptionOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  textOption: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textQuantity: {},
  backTitle: {
    marginTop: "10%",
    flexDirection: "row",
  },
  buttonReturn: {
    marginTop: "4%",
  },
});
