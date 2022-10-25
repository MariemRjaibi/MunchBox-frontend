import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

    

export default function SignupScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const handleSubmit = () => {
    //     dispatch(login(username));
    //     navigation.navigate('TabNavigator');
    //   };

return (
    <ImageBackground source={require('../assets/background-concept.jpg')} style={styles.background}>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
    <Image source={require('../assets/Munchbox-logo.jpg')} style={styles.logo}/>
<Text style={styles.title}>Join us today!</Text>
<Text style={styles.signup}>Sign Up</Text>



    <View style={styles.input}>
    <Text style ={{color: 'white', fontSize: 20}}>Username</Text>
<TextInput placeholder="Username" onChangeText={(value) => setUsername(value)} value={username} style={styles.inputContent}/>
<Text style ={{color: 'white', fontSize: 20}}>Email</Text>
<TextInput placeholder="Email" onChangeText={(value) => setEmail(value)} value={email} style={styles.inputContent}/>
<Text style ={{color: 'white', fontSize: 20}}>Password</Text>
<TextInput placeholder="Password" onChangeText={(value) => setPassword(value)} value={password} style={styles.inputContent} />
</View>

<TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
    <Text style ={styles.register}>Register</Text>
</TouchableOpacity>

<View style={{flexDirection: 'row', alignItems: 'center'}}>
  <View style={{flex: 1, height: 2, backgroundColor: '#92C3BC'}} />
  <View>
    <Text style={{width: 150, textAlign: 'center', color: 'white'}}>or sign up with</Text>
  </View>
  <View style={{flex: 1, height: 2, backgroundColor: '#92C3BC'}} />
</View>

</KeyboardAvoidingView>
</ImageBackground>
);
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center" 
    },
    container: {
        marginTop: 50,
        width:"100%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
    
    },
    logo: {
        width: "50%",
        height: "20%",
        borderRadius: 50,
        opacity: 0.9,     
    },   
    title: {
        color: "white",
        fontSize: 40,
        justifyContent: "center",
        fontWeight: "bold",
    },
    signup: {
        color: "white",
        fontSize: 45,
        justifyContent: "center",
    },
    button: {
        marginTop: 20,
        // marginLeft: "30%",
        backgroundColor: "#F9D77E",
        borderRadius: 30,
        width: "40%",
        height: 40,
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 20,
    },
    inputContent: {
        backgroundColor: "white",
        padding: 2,
        marginTop: 6,
       width: "100%",
       borderColor: "#E9E9E9",
       borderRadius: 30,
       fontSize: 14,
       marginBottom: 20,
       paddingLeft: 10,
    },
    email: {
        backgroundColor: "white",
        borderRadius: 30,
    },
  password: {
    backgroundColor: "white",
    borderRadius: 30,
  },
    input: {
        padding: 20,
        width: "90%",
    },
    register: {
        fontWeight: "500",
    },
});