import { useSelector, useDispatch } from "react-redux";
import { addFavorites, removeFavorites, removeAllFavorites } from "../reducers/favorites";
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function FavoritesScreen({ navigation }) {

  const dispatch = useDispatch();

  // ======= Bouton retour  =======//
  const goBack = () => {
    navigation.goBack();
  };

  // Récuperer les données stocker dans le stock favorrites
  const favorites = useSelector((state) => state.favorites.value);
  //console.log(favorites)

  function handleFavoris(data) {
    // Ajouter aux favoris
   //dispatch(addFavorites(data));

   //supprimer des Favoris 
   dispatch(removeFavorites(data));

    // Tout supprimer 
   // dispatch(removeAllFavorites())
  }

  // Si y pas de recette au favoris un message, Si non afficher les recettes
  let listRecipes = <Text>Add recipes to your favorites</Text>;
  if (favorites.length >0) {
    listRecipes = favorites.map((data, i) => {
      return (
                <View key={i} style={styles.cardRecipe}>
                  <Image style={styles.imageRecipe} source={{ uri: data.image }} />
                  <TouchableOpacity onPress={() => handleFavoris(data)} style={styles.iconContent}>
            <FontAwesome name="heart" size={20} color={"red"} />
          </TouchableOpacity>
                  
                  <Text style={styles.cardTitle}>{data.title}</Text>

                  <View style={styles.cardInfo}>
            <View style={styles.containerInfo}>
              <FontAwesome name="clock-o" size={20} color={"#92C3BC"} />
              <Text style={styles.textInfo}>{data.time}</Text>
              
            </View>
            <View style={styles.containerInfo}>
              <FontAwesome
                name="calendar"
                size={20}
                color={"#83C5BC"}
                onPress={() => addClick()}
                style={styles.iconCalendar}
              />
            </View>
          </View>
                  
                </View>
      );
    });
  }


  return (
    <View style={styles.container}>
      <View style={styles.containerheader}>
        <FontAwesome
          name="chevron-left"
          size={20}
          color={"#92C3BC"}
          style={styles.buttonReturn}
          onPress={goBack}
        />

        <View>
          <TouchableOpacity style={styles.containerIconUser}>
            <Image
              style={styles.imageProfil}
              source={require("../assets/Etchebest.jpg")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerHead}>
        <Text style={styles.title}>Favorite Recipes</Text>
        <Text style={styles.subTitle}>What you want to cook today ?</Text>
      </View>


      <View style={styles.containerNumberRecipes}>
        <Text style={styles.textNumberRecipes}>Number of recipes saved : </Text>
        <Text style={styles.numberRecipe}>{listRecipes.length}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.containerRecipes}>{listRecipes}</ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 45,
    paddingHorizontal: 20,
  },
  containerheader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageProfil: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#83C5BC",
  },
  containerHead: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#92C3BC",
  },
  containerNumberRecipes: {
    flexDirection: "row",
    alignItems: "flex-start",
    //justifyContent:"center",
    marginBottom: 10,
  },
  textNumberRecipes: {
    fontSize: 18,
  },
  numberRecipe: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#83C5BC",
    //backgroundColor: "#FFD87D",
    //padding: 7,
    //borderRadius: 100,
  },
  containerFilter: {
    flexDirection: "row",
    marginBottom: 20,
  },
  filterIcon: {
    backgroundColor: "#FFD87D",
    padding: 5,
    paddingHorizontal: 8,
    borderRadius: 100,
    marginRight: 10,
  },
  contentScroll: {
    //height: 25,
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-evenly",
    //marginBottom: 30,
  },
  menuBtn: {
    paddingHorizontal: 20,
    backgroundColor: "#83C5BC",
    marginHorizontal: 5,
    borderRadius: 20,
    //borderBottomWidth: 2,
    // borderBottomColor: "#92C3BC",
  },
  menuBtnText: {
    fontSize: 16,
    //fontWeight: "bold",
    paddingBottom: 5,
    color: "#ffffff",
  },
  containerRecipes: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  cardRecipe: {
    backgroundColor: "rgba(255, 216, 125, 0.3)",
    marginHorizontal: 5,
    paddingBottom: 10,
    borderRadius: 15,
    width: 150,
    height: "auto",
    marginBottom: 20,
  },
  cardTitle: {
    paddingVertical: 10,
    fontWeight: "500",
    paddingLeft: 5,
  },
  imageRecipe: {
    width: "100%",
    height: 120,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  cardInfo: {
    paddingHorizontal: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  containerInfo: {
    flexDirection: "row",
  },
  textInfo: {
    paddingLeft: 5,
    fontSize: 12,
  },
  iconContent: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

// let listRecipe = [
//   {
//     id: 1,
//     image: require("../assets/plat-1.jpg"),
//     name: "Steak with Oriental vegeratien ",
//     time: "35 min",
//   },
//   {
//     id: 2,
//     image: require("../assets/plat-2.jpg"),
//     name: "Pizza with love",
//     time: "1h30",
//   },
//   {
//     id: 3,
//     image: require("../assets/plat-1.jpg"),
//     name: "Pate avec steak",
//     time: "65 min",
//   },
// ];
