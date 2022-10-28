import { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Switch,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable,
} from "react-native";
import Homepage from "./Homepage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import SwitchSelector from "react-native-switch-selector";


export default function RecipeModal() {
   const [isEnabled, setIsEnabled]= useState ('ingredients'); //set switchselector to ingredients
   const [isActive, setIsActive]= useState(false); //change state between ingredients and steps

   const handlePress= (value) => {
    setIsEnabled(value);
    setIsActive (isActive => {return !isActive});
   }
    console.log('Hello', isEnabled)
    console.log('Bye', isActive)

    
      return (
        <SafeAreaView style={styles.container}>
<ScrollView contentContainerStyle={styles.scrollview}>
      
        <Image
            source={require("../assets/RecipeModalChicken.jpg")}
            style={styles.chicken}
          />
           <Ionicons name="close" size={24} color='#dedede' style={styles.close} />
           <Ionicons name="heart" size={24} color='#dedede' style={styles.heart} />

          <Text style= {styles.title}>Mushroom Chicken with Rice</Text> 

          <View style={styles.input}>
          <FontAwesome name='clock-o' size={25} color='#92C3BC' style={styles.icons} />
          <Text>25mins</Text>
          <Ionicons name="barbell" size={25} color='#92C3BC' style={styles.icons}/>
          <Text>250 kJ</Text>
          </View>
          <View style={styles.star}>
          <FontAwesome name='star-o' size={25} color='#92C3BC' style={styles.note} />
          <FontAwesome name='star-o' size={25} color='#92C3BC' style={styles.note} />
          <FontAwesome name='star-o' size={25} color='#92C3BC' style={styles.note} />
          <FontAwesome name='star-o' size={25} color='#92C3BC' style={styles.note} />
          <Text style= {styles.starnote}> 4/5 (123 reviews)</Text>
          </View>
          <SwitchSelector
            buttonColor= {"#92C3BC"}
            ios_backgroundColor= {"#92C3BC"}
            hasPadding
            style={{marginTop: 20}}
            initial={0}
            onPress = {(value)=>handlePress(value)}
            value={isEnabled}
            
            options={[
                { label: "Ingredients", value: 'ingredients' }, 
                { label: "Steps", value: 'steps' } 
              ]}   
          />
{!isActive && (isEnabled==='ingredients') ? <Text>Ingredients Modal</Text>: <Text>Steps Modal</Text>}
          <Text style={{fontSize: 20, fontWeight: "bold", marginTop: 20, marginBottom: 10}}>
            Nutrition Information
          </Text>
          
            <Text style={{fontSize: 10}}>Fat Carbohydrates Sugar Cholesterol Sodium Protein</Text>
            <View style={{flexDirection: 'row'}}>
            <Ionicons name="fast-food-outline" size={25} color='#92C3BC' style={styles.info}/>
            <Ionicons name="fast-food-outline" size={25} color='#92C3BC' style={styles.info}/>
            <Ionicons name="fast-food-outline" size={25} color='#92C3BC' style={styles.info}/>
            <Ionicons name="fast-food-outline" size={25} color='#92C3BC' style={styles.info}/>
            <Ionicons name="fast-food-outline" size={25} color='#92C3BC' style={styles.info}/>
            <Ionicons name="fast-food-outline" size={25} color='#92C3BC' style={styles.info}/> 
          </View>
          <Text>Read Reviews</Text>
          <Text>Rate this recipe: <FontAwesome name='star-o' size={20} color='#92C3BC' style={styles.note} /></Text>
          <View style={{flexDirection:'row'}}>
            <TextInput placeholder="Share your review with us..." style={styles.text}/>
         <Pressable onPress={() => handlePress()} style={styles.submit}> 
         <Ionicons name="send-outline" size={23} color='#FAD874' style={styles.iconsend}/> 
         </Pressable>
         </View>
         <Text>Experiencing an issue with the mobile site?</Text>
          </ScrollView>
          </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    chicken: {
        width: "100%",
        height: "30%",
        borderRadius: 30,
        marginTop: 30,
    },
    close:{
        position: "absolute", 
        top:10,
        right:10,
        color:'black'
      },
    heart: {
        position: "absolute",
        top: 40,
        right: 50,
        color: "red",
    },  
    container: {
       backgroundColor: "white",
       alignItems: "center",
    },
    scrollview: {
        flex: 1,
       backgroundColor: "#FAD874",    
       paddingBottom: 20,    
       alignItems: "center",
       paddingHorizontal: 30,
    },
    title : {
        marginTop: 20,
        fontWeight: "bold",
        fontSize: 20,
    },
    input: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginRight: 15,
    },
    icons: {
       paddingRight: 5,
       paddingLeft: 30,
    },
    star: {
        marginTop: 20,
       flexDirection: "row",
    },
    starnote: {
       paddingLeft: 80,
    },
    ingredient: {
        marginTop: 30,
    },
    info: {
        paddingRight: 10,
        paddingLeft: 10,
        marginBottom: 30
    },
    text:{
        backgroundColor: "white",
        padding: 2,
        marginTop: 30,
        width: "80%",
        borderColor: "#E9E9E9",
        borderRadius: 5,
        fontSize: 14,
        marginBottom: 50,
        paddingLeft: 10,
    },
    submit: {
        backgroundColor: "#92C3BC",
        width: 40,
        height: 35,
        borderRadius: 5,
        marginTop: 30,
        alignItems: "center",
        paddingLeft: 5
    },
    iconsend:{
        paddingTop: 3
         
    }
})