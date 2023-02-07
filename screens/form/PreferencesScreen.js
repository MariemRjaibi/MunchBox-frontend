import { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

export default function PreferencesScreen({ formData, setFormData }) {

  const [preferenceList, setPreferenceList] = useState([]);

  // default diet list
  const optionsData = [
    { id: 1, name: "Vegan", photo: require("../../assets/icon/vegan.png"), isActive: false, },
    { id: 2, name: "Veggie", photo: require("../../assets/icon/broccoli.png"), isActive: false, },
    { id: 3, name: "Pescatarian", photo: require("../../assets/icon/fish-food.png"), isActive: false, },
    { id: 4, name: "Gluten Free", photo: require("../../assets/icon/grain.png"), isActive: false, },
    { id: 5, name: "Lacto-vegetarian", photo: require("../../assets/icon/milk.png"), isActive: false, },
    { id: 6, name: "Ovo-vegetarian", photo: require("../../assets/icon/oeuf-dur.png"), isActive: false, },
    { id: 7, name: "Paleo", photo: require("../../assets/icon/chicken.png"), isActive: false, },
  ];

 
  const preferenceClik = (data) => {

    if (preferenceList.includes(data.name)) {
      // Filter if name is in preferenceList
      setPreferenceList(preferenceList.filter((e) => e !== data.name));
      setFormData({
        ...formData,
        regime: [...preferenceList].filter((e) => e !== data.name),
      });
    } else {
      // push
      setPreferenceList([...preferenceList, data.name]);
      setFormData({
        ...formData,
        regime: [...preferenceList, data.name],
      });
    }

  };

  const optionPreferences = optionsData.map((data, i) => {

     // change the color
     let isActive = preferenceList.some((e) => {
      return e === data.name;
    })


    return (
      <View key={i} style={styles.section}  backgroundColor={isActive ? "#E8F4F5" : "#ffffff"}>
        <TouchableOpacity onPress={() => preferenceClik(data)}>
          <Image source={data.photo} style={styles.photo} />
          <Text style={styles.textOption} >{data.name}</Text>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍉 Food preferences</Text>
      <Text style={styles.text}>Do you follow any special diets ? </Text>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.containerPreference}>{optionPreferences}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#92C3BC",
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    //color:"#ABAEB1",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    //color:"#ABAEB1",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "96%",
    padding: 10,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#E9E9E9",
    borderRadius: 100,
    fontSize: 14,
  },
  textOption: {
    paddingRight: 10,
    color: "#fff",
  },
  btnPlus: {
    backgroundColor: "#e8be4b",
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 100,
    position: "absolute",
    right: 10,
    top: "10%",
  },
  contentContainer: {
    margin: 0,
    padding: 0,
  },
  containerOption: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  addOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#92C3BC",
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 100,
    marginHorizontal: 5,
    marginTop: 10,
  },
  btnDelete: {
    color: "#ffffff",
  },
  containerPreference: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  section: {
    padding: 10,
    //backgroundColor: "#ffffff",
    borderRadius: 20,
    marginBottom: 20,
    marginLeft: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.24,
    elevation: 3,
  },
  photo: {
    margin: 10,
    width: 40,
    height: 40,
  },
  textOption: {
    textAlign: "center",
    width: 65,
  },
});
