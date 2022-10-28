import { useState } from "react";
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
  ScrollView
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";



export default function ShoppinglistScreen() {
 

// ======= Liste des courses entrées manuellement par l'utilisateur ======= //
  const [shopping, setShopping] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  // Récupérer et stocker les aliments écrit par l'utilisateur dans l'input
  const addIngredientPress = () => {

    //Afficer les aliments taper par l'utilisateur
    setShoppingList([...shoppingList, shopping]);
    setShopping("");

  };

    // Ajouter des aliments à la liste des allergies
  const listCoursesUser = shoppingList.map((data, i) => {
    //const [isCheckedUserList, setCheckedUserList] = useState(false);
    // value={isCheckedUserList}  onValueChange={ () => setCheckedUserList(current => !current)} color={isCheckedUserList ? "#92C3BC" : undefined}
    return (
      <View key={i} style={styles.section}>
        <Checkbox style={styles.checkbox}/>
        <Text style={styles.textOption}>{data}</Text>
      </View>
    );
  });


// ======= Pour récupérer les données des ingrédients directement via les recettes ======= //
  const optionsData = [
    { id: 1, option: "Rice", quantity: "13g", isChecked: false },
    { id: 2, option: "Chicken", quantity: "2kg", isChecked: false },
    { id: 3, option: "Apple", quantity: "3qts", isChecked: false },
    { id: 4, option: "Suggar", quantity: "123g", isChecked: false },
    { id: 5, option: "Fish", quantity: "9kg", isChecked: false },
  ];

  const option = optionsData.map((data, i) => {
    const [isChecked, setChecked] = useState(false);

    const checkboxClick = () =>{
      setChecked(current => !current);
      console.log("coucou")
    }

    return (
      <View key={i} style={styles.section}>
        <Checkbox style={styles.checkbox} value={isChecked}  onValueChange={checkboxClick} color={isChecked ? "#92C3BC" : undefined}/>
        <View style={styles.containeDescriptionOption}>
          <Text style={styles.textOption}>{data.option}</Text>
          <Text style={styles.textQuantity}>{data.quantity}</Text>
        </View>
      </View>
    );
  });

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} >
      <FontAwesome name="chevron-left" size={20} color={"#92C3BC"} style={styles.buttonReturn}/>
      <View style={styles.containerHead}>
        <Text style={styles.title}>Shopping list</Text>
        <Text style={styles.subTitle}>What are your next races?</Text>
      </View>
      <View style={styles.containerInput}>
        <TextInput placeholder="What do you need?" onChangeText={(value) => setShopping(value)} value={shopping} style={styles.input}/>
        <View>
          <FontAwesome name="plus" size={20} color={"#ffffff"} onPress={() => addIngredientPress()} style={styles.btnPlus} />
        </View>
      </View>
      
      <ScrollView contentContainerStyle={styles.containerCheckbox}>
        <View>
          <Text style={styles.titleProduct}>Need for recipes</Text>
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
    padding: 30,
    backgroundColor: "#FBFBFB",
    //justifyContent: "space-between",
    //   width: Dimensions.get('window') .width,
  },
  containerHead:{
    marginBottom:20,
  },
  title: {
    fontSize: 30,
    fontWeight:"bold",
    color:"#92C3BC",
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
    padding:10,
    paddingHorizontal:12,
    borderRadius: 100,
    right:50,
    top:3,
  },
  titleProduct:{
    backgroundColor:"#FFD87D",
    padding:6,
    paddingHorizontal:20,
    width: "auto",
    borderRadius: 100,
    fontSize:16, 
    fontWeight:"bold",
    marginBottom: 20,
    marginTop:20,
    
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
  containeDescriptionOption:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    width:"80%"
  },
  textOption: {
    fontSize: 16,
    fontWeight:"bold"
  },
  textQuantity:{
     
  },

});
