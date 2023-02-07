import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Homepage from "./Homepage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/users";
import { LinearGradient } from "expo-linear-gradient";
import SignupScreen from "./SignupScreen";

export default function SigninScreen({ navigation }) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const token = useSelector((state) => state.users.value.token);

     //function that directs registered users to sign in page 
     const handleConnection = () => {
    //console.log("clicked")
    fetch("https://munch-box-backend.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => response.json())
      .then(data => {
        data.result && dispatch(login({ username: data.username, token: data.token}));
        
         if (token) {
          navigation.navigate(Homepage);
        }
         
        })
      
    
 
  };


        return (
            <ImageBackground
              source={require("../assets/background-concept.jpg")}
              style={styles.background}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={styles.container}
                >
                  <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.container}
            >

              
                  <Image
                    source={require("../assets/logo2blanc.png")}
                    style={styles.logo}
                  />


                  <Text style={styles.title}>Join us today!</Text>
                  <Text style={styles.signup}>Sign In</Text>
                  <View style={styles.input}>
                    <Text style={{ color: "white", fontSize: 20 }}>Username</Text>
                    <TextInput
                      placeholder="Username"
                      onChangeText={(value) => setUsername(value)}
                      value={username}
                      style={styles.inputContent}
                    />
                    <Text style={{ color: "white", fontSize: 20 }}>Password</Text>
                    <TextInput
                      placeholder="Password"
                      onChangeText={(value) => setPassword(value)}
                      secureTextEntry={true}
                      value={password}
                      style={styles.inputContent}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={() => handleConnection()} 
                  >
                    <Text style={styles.register}>Let's Cook!</Text>
                  </TouchableOpacity>

                  <View style={{ flexDirection: "row", alignItems: "center", marginTop:20 }}>
                <View
                  style={{ flex: 1, height: 2, backgroundColor: "#92C3BC" }}
                />
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(SignupScreen)}
                  >
                    <Text
                      style={{
                        width: 150,
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      No account yet ?
                    </Text>
                    <Text
                      style={{
                        width: 150,
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      Sign Up Here
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ flex: 1, height: 2, backgroundColor: "#92C3BC" }}
                />
              </View>

                  </LinearGradient>
                </KeyboardAvoidingView> 
              </TouchableWithoutFeedback>
              
            </ImageBackground>
          );
    
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      //alignItems: "center",
    },
    container: {
      flex: 1,
      marginTop: 50,
      width: "100%",
      //height: "80%",
      //justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: 200,
      height: "17%",
      marginBottom: 30,
      backgroundColor: "rgba(0,0,0, 0.5)",
    },
    title: {
      color: "white",
      fontSize: 40,
      justifyContent: "center",
      fontWeight: "bold",
    },
    signup: {
      color: "white",
      fontSize: 30,
      justifyContent: "center",
    },
    button: {
      backgroundColor: "#e8be4b",
      color:"#fff",
      fontSize: 25,
      padding:10,
      paddingHorizontal:50,
      borderTopRightRadius:45,
      borderBottomLeftRadius:45,
      marginBottom:10,
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