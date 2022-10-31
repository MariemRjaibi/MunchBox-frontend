import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import font from "expo-font";

export default function BatchCalendar(navigation) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [recettes, setRecettes] = useState([
    {
      id: 1,
      image: require("../assets/plat-1.jpg"),
      name: "Steak with vegeratien ",
      time: "35 min",
      date: undefined,
    },
    {
      id: 2,
      image: require("../assets/plat-2.jpg"),
      name: "Pizza with love",
      time: "1h30",
      date: undefined,
    },
    {
      id: 3,
      image: require("../assets/plat-1.jpg"),
      name: "Pate avec steak",
      time: "65 min",
      date: undefined,
    },
  ]);

//affichage du Datepicker sur telephone
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
    console.warn(date);
    let res = recettes.map((element, index) => ({
      ...element,
      date: index == currentIndex ? date : element.date,
    }));
    setRecettes(res);

    hideDatePicker();
  };

  let dateRecipe = recettes.map((data, i) => {
    return (
      <View style={styles.cardRecipe}>


        <DateTimePickerModal
          style={styles.calendrier}
          isVisible={isDatePickerVisible}
          mode="date" 
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          //Affiche la date a choisir a partir d'aujourd'hui
          minimumDate={moment().toDate()}
        />
        <View key={"item" + i} contentContainerStyle={styles.containerRecipes}>
          <View style={styles.descriptionRecipe}>
            <Image style={styles.imageRecipe} source={data.image} />
            <View style={styles.descriptionRecipeText}>
              <Text style={styles.titleRecipe}>{data.name} </Text>
              <Text>{data.time}</Text>

              <Button
                buttonTextColorIOS="blue"
                title="Please select date"
                onPress={() => showDatePicker(i)}
              />
              <Text style={styles.textChoixDate1}></Text>
              <Text style={styles.textDate}>
                {`Selected Date:  ${
                  data.date
                    ? moment(data.date).format("DD-MM-YYYY")
                    : "Please select date"
                }`}
                ;
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.container1}>
      <View style={styles.title1}>
        <Text style={styles.textChoix1}> Batch Calendar</Text>
      </View>
      <Text style={styles.titre}> Plan your Batch Calendar</Text>
      <View style={styles.container}>
        <View style={styles.containerRecipes}>{dateRecipe}</View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("ShoppingList")}
        style={styles.button2}
        activeOpacity={0.3}
      >
        <Text style={styles.textButton}> Generate My Shopping List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: "#DEDfDE",
    justifyContent: "top",
    padding: 8,
    borderRadius: 15,
    height: "auto",
  },

  calendrier: {
    backgroundColor: "red",
  },
  textDate: {
    left: 10,
  },
  textChoixDate1: {
    fontSize: 14,
    top: -80,
    justifyContent: "space-around",
    right: 50,
  },
  container1: {
    flex: 1,
    padding: 30,
  },

  textChoix1: {
    color: "#DE45FF",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: 60,
    fontWeight: "600",
    fontSize: 30,
    padding: 20,
    left: 100,
    fontFamily: "Grandhotel",
  },

 
  
  button2: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    position: "absolute",
    top: 600,
    right: 140,
  },
  textButton: {
    color: "#DE45FF",
    height: 30,
    fontWeight: "600",
    fontSize: 12,
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
  containerRecipes: {
    marginTop: 25,
  },
});
