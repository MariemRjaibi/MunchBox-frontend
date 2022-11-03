import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";


import Calendar from "../reducers/Calendar";
import { removeAllBatch, uncalendar } from "../reducers/Calendar";

// Exetension Date
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { faGrinAlt } from "@fortawesome/free-solid-svg-icons";
//import DateTimePicker from "@react-native-community/datetimepicker";
//import font from "expo-font";


export default function BatchCalendar({ navigation }) {

  
  const dispatch = useDispatch();

  //const calendars = useSelector((state) => state.calendars.value);
 const users = useSelector((state) => state.users.value);

 const token = useSelector((state) => state.users.value.token);

  // ======= Bouton retour  =======//
  const goBack = () => {
    navigation.goBack();
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [calendarRecipesToDisplay, setCalendarRecipesToDisplay] = useState([]);




  // ==== Récuperer les recettes en base de donnée ajouter par l'utilisateur ==== //
  useEffect(() => {
    fetch(`http://192.168.10.183:3000/calendarRecipes/${token}`)
      .then((response) => response.json())
      .then((data) => {
        setCalendarRecipesToDisplay(data.recipes);
      });
  }, []);

  // Afficher le calendrier pour selectionner une date 
  const showDatePicker = (i) => {
    setCurrentIndex(i);
    setDatePickerVisibility(true);
  };

  //cacher le datepicker du telephone
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };


 //permet de renvoyer une date par item en selectionnant son index puis une fois confirmé on cache la modal datepicker
 const handleConfirm = (date) => {
  let res = calendarRecipesToDisplay.map((element, index) => ({
    ...element,
    date: index == currentIndex ? date : element.date,
  }));
  setCalendarRecipesToDisplay(res);

  hideDatePicker();
};


// Supprimer une recette du batch
function deleteRecipe(data) {
  console.log("Je supprime :", data._id)
  fetch(`http://192.168.10.183:3000/calendarRecipes/${data._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipes: data._id }),
    }).then(response => response.json())
      .then(data => {
        console.log("j'ai supprimer")
        data.result
      });
}


  let dateRecipe = calendarRecipesToDisplay.map((data, i) => {
    
    return (
      <View style={styles.ContainerDescriptionRecipe}>

        <Image style={styles.imageRecipe} source={{ uri: data.image}} />
        <TouchableOpacity style={styles.containIconTrash} onPress={() => deleteRecipe(data)}>
          <FontAwesome name="trash-o" size={20} color={"#FFFFFF"}/>
        </TouchableOpacity>
       

        <DateTimePickerModal
          style={styles.calendrier}
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          //Affiche la date a choisir a partir d'aujourd'hui
          minimumDate={moment().toDate()}
        />
        <View key={"item" + i} style={styles.containRecipes}>
          <View style={styles.descriptionRecipe}>
            <View style={styles.descriptionRecipeText}>
              <Text style={styles.titleRecipe}>{data.title}</Text>
             
              
              <TouchableOpacity
                style={styles.btnAddDate}
                onPress={() => showDatePicker(i)}
              >
                <Text style={styles.TextBtnAddDate}>Select date</Text>
              </TouchableOpacity>
              <View style={styles.containTime}>
                <FontAwesome
                  name="clock-o"
                  size={20}
                  color={"#92C3BC"}
                  style={styles.iconInfoBatch}
                />
                <Text>{data.prepTime} mins</Text>
              </View>
              <View style={styles.containTime}>
                <FontAwesome
                  name="calendar"
                  size={18}
                  color={"#83C5BC"}
                  style={styles.iconInfoBatch}
                />
                <Text style={styles.textDate}>
                  {`Date:  ${
                    data.date ? moment(data.date).format("DD-MM-YYYY") : "🤷‍♂️"
                  }`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  });

 

  return (
    <View style={styles.container}>
      <FontAwesome
        name="chevron-left"
        size={20}
        color={"#92C3BC"}
        style={styles.buttonReturn}
        onPress={goBack}
      />
      <Text style={styles.title}>Recipe list for the week</Text>
     
      <View style={styles.containerInfo}>
      

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
          <Text style={styles.dataInfoBacth}>{dateRecipe.length}</Text>
        </View>
      </View>
      </View> 

      <ScrollView contentContainerStyle={styles.containerRecipes}>
        {/* <Text style={styles.subTitle}>Lundi</Text> */}
        {dateRecipe}
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
    paddingBottom: 10,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 50,
    color: "#92C3BC",
    textAlign: "center",
    fontFamily:"Grandhotel",
  },
  dateBacth: {
    textAlign: "center",
    fontSize: 20,
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
    paddingRight: 5,
  },
  dataInfoBacth: {
    color: "#92C3BC",
    fontWeight: "bold",
  },
  containerRecipes: {
    marginTop: 25,
    paddingBottom: 20,
  },
  containRecipes:{
    marginTop:10,
  },
  ContainerDescriptionRecipe:{
    backgroundColor: "#ffffff",
    flexDirection: "row",
    borderRadius: 20,
    marginBottom: 15,
  },
  descriptionRecipe: {
    flexDirection: "row",
   // backgroundColor: "pink",
    width:"88%",
    paddingBottom: 10,
  },
  descriptionRecipeText: {
    //paddingTop: 10,
    paddingLeft: 18,
    width:"90%",
  },
  btnAddDate: {
    backgroundColor: "#FFD87D",
    padding: 5,
    width: "50%",
    borderRadius: 100,
    marginVertical:10,
  },
  TextBtnAddDate:{
    textAlign:"center"
  },
  imageRecipe: {
    width: 120,
    height: "100%",
    borderRadius: 20,
  },
  containIconTrash:{
    position:"absolute",
    top:10,
    left:10,
    backgroundColor:"rgba(0,0,0, 0.3)",
    padding:10,
    paddingHorizontal:14,
    borderRadius:100,
  },
  titleRecipe: {
    fontSize: 15,
    fontWeight: "bold",
  },
  containerBtn: {
    marginTop: 20,
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
  containTime:{
    flexDirection:"row",
  },
  calendrier: {
    backgroundColor: "#774400"
   
  },

});
