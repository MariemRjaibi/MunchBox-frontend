import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import {
    KeyboardAvoidingView,
    Platform, 
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback, 
    Keyboard
  } from 'react-native';
  
  import FontAwesome from 'react-native-vector-icons/FontAwesome';

//  <Checkbox
//             disabled={false}
//             value={toggleCheckBox}
//             onValueChange={(newValue) => setToggleCheckBox(newValue)}
//         /> 
  
  
  export default function AllergiesScreen({formData, setFormData}) {
   
    const [allergies, setAllergies] = useState('');
    

    const optionsData = [
        { id: 1, option: 'Vegan', isChecked: false},
        { id: 2, option: 'vegetarien', isChecked: false},
        { id: 3, option: 'Pesco-végétarien', isChecked: false},
        { id: 4, option: 'Gluten-free', isChecked: false},
        { id: 5, option: 'Lactose', isChecked: false},
       ];
 
    const option = optionsData.map( (data, i) => {
        const [isChecked, setChecked] = useState(false);
        return (
            <View key={i} style={styles.section}>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked}  color={isChecked ? '#92C3BC' : undefined}/>
                <Text style={styles.textOption}>{data.option}</Text>
            </View>
        )
    }) 

  
    return (
      
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        
       
           <View>
                <Text style={styles.title}>Food allergies</Text>
                <Text style={styles.text}>Avez-vous un régime alimentaire ?  </Text>
            </View>

            <View style={styles.containerCheckbox}>
                {option}
            </View>
            
            <View>
                <Text style={styles.subTitle} >I can't eat ...</Text>
                <TextInput placeholder="Tell me your allergies" onChangeText={(value) => setAllergies(value)} value={allergies} style={styles.input} />
            </View>
            
         
        </KeyboardAvoidingView>
  
      
        
  
    
    )
  }
  
  const styles = StyleSheet.create({
    // container: {
    //       flex: 1,  
    //     width: "100%",
    //       padding: 30,
    //       backgroundColor: "#FBFBFB",
    //       justifyContent: "space-between",
    //     //   width: Dimensions.get('window') .width,
        
    // },
    title: {
      fontSize: 35,
      fontWeight: "bold",
      marginBottom:15,
      //marginTop: 25,
    },
    text: {
      fontSize: 16,
      marginBottom:20,
    }, 
    containerCheckbox:{
        marginBottom: 40,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        margin: 8,
        width: 30,
        height: 30,
    },
    textOption:{
        fontSize: 15,
    },
    subTitle:{
        fontSize:25,
        fontWeight:"bold",
        marginBottom: 15,

    },
    input: {
        width: '96%',
        padding: 10,
        marginTop: 6,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        borderRadius: 100,
        fontSize: 14,

    },
   
    
  });
  