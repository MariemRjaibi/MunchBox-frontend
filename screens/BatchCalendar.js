import React, { useState } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function BatchCalendar() {
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    console.warn("la date choisie est: ", date);
    hideDatePicker();
  };

  return (
    <View style={styles.container1}>
      <View style={styles.title1}>
        <Text style={styles.textChoix1}> Batch Calendar</Text>
      </View>
      <Text style={styles.titre}> Plan your Batch Calendar</Text>
      <View style={styles.container}>
        <View style={styles.cards1}>
          <View style={styles.carteRecette}>
            <Image
              style={styles.imageRecette1}
              source={require("../assets/plat.png")}
            />

            <Text style={styles.textChoix2}>Pizza Napolitaine</Text>
          </View>

          <Text style={styles.textChoixDate1}>
            <Button
              buttonTextColorIOS="blue"
              title="Please select date"
              onPress={showDatePicker}
            />

            <Text
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >{`Selected Date:  ${
              selectedDate
                ? moment(selectedDate).format("DD/MM/YYYY")
                : "Please select date"
            }`}</Text>
          </Text>

          <View>
            <DateTimePickerModal
              style={styles.calendrier}
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Text
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >{`Selected Date:  ${
              selectedDate
                ? moment(selectedDate).format("DD/MM/YYYY")
                : "Please select date"
            }`}</Text>
          </View>
          </View>
          <View style={styles.container2}><Text
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >{`Selected Date:  ${
                selectedDate
                  ? moment(selectedDate).format("DD/MM/YYYY")
                  : "Please select date"
              }`}</Text></View>
          <View style={styles.cards2}>
            <View style={styles.carteRecette}>
              <Image
                style={styles.imageRecette1}
                source={require("../assets/plat.png")}
              />
              <Text style={styles.textChoix2}>Pizza Marguerita</Text>
            </View>
            <Text style={styles.textChoixDate1}>
              <Button
                buttonTextColorIOS="blue"
                title="Please select date"
                onPress={showDatePicker}
              />
              <Text
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >{`Selected Date:  ${
                selectedDate
                  ? moment(selectedDate).format("DD/MM/YYYY")
                  : "Please select date"
              }`}</Text>
            </Text>
          </View>
        
        </View>
      </View>
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.85,
    backgroundColor: "#DEDEDE",
    justifyContent: "top",
    padding: 8,
    borderRadius: 15,
    height: "auto",
  },
  container2:{
    flex: 0.1,
    padding: 5,
  },
  cards1: {
    backgroundColor: "#DEBACC",
    borderRadius: 15,
    height: "14%",
  },
  cards2: {
    backgroundColor: "#DEBAFF",
    borderRadius: 15,
    height: "14%",
  },
  calendrier: {
    backgroundColor: "red",
  },
  carteRecette: {
    backgroundColor: "#FCFED5",
    marginHorizontal: 5,
    paddingBottom: 10,
    borderRadius: 15,
    width: 120,
    height: "auto",
    marginBottom: 0,
  },
  textChoixDate1: {
    fontSize: 14,
    left: 160,
    top: -80,
    justifyContent: "space-around",
    right: 50,
  },
  container1: {
    flex: 1,
    padding: 30,
  },
  text: {
    fontSize: 14,
    borderColor: "F9D77E",
    borderWidth: 2,
    borderRadius: 15,
    width: 190,
    padding: 10,
    left: 150,
    top: -70,
  },
  textChoix1: {
    color: "#DE45FF",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: 60,
    fontWeight: "600",
    fontSize: 16,
    padding: 20,
    left: 100,
  },
  imageRecette1: {
    justifyContent: "center",
    backgroundColor: "red",
    borderRadius: 15,

    width: 120,
    height: 80,
  },
  boutonDate: {
    fontSize: 19,
    left: 160,
    top: -80,
    justifyContent: "space-around",
    right: 50,
  },
  chosenDate: {
    left: -50,
    flex: 1,
  },
});
