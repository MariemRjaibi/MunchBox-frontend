import React, { useState, } from "react";
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
import SigninScreen from "./SigninScreen";
export default function SignupScreen({ navigation }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailValidError, setEmailValidError] = useState(false);
  const [password, setPassword] = useState("");
  const token = useSelector((state) => state.users.value.token);
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  //console.log(token);
  //function that directs new users to signup page
  const handleRegister = () => {
    fetch("http://192.168.10.159:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.result) {
          dispatch(login({ username: username, token: data.token }));
          setUsername("");
          setPassword("");
        }
      });
      if (username&&email&&password) {
        navigation.navigate(Homepage);
      }
 
  };

  // console.log('token', token)

  //function that directs registered users to sign in page 
  const handleConnection = () => {
    fetch("http://192.168.10.159:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: signInUsername, token: data.token }));
          setSignInUsername("");
          setSignInPassword("");
        }
      });
      if (token) {
        navigation.navigate(Homepage);
      }
 
 };

 const handleValidEmail = (value) => {
  let reg =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
if (reg.test(value)) {
    setEmailValidError(false);
  } else {
    setEmailValidError(true);
  }
  };

  //if token is not identified, sign up page appears
  if (!token) {
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
              source={require("../assets/Munchbox-logo.jpg")}
              style={styles.logo}
            />
            <Text style={styles.title}>Join us today!</Text>
            <Text style={styles.signup}>Sign Up</Text>

            <View style={styles.input}>
              <Text style={{ color: "white", fontSize: 20 }}>Username</Text>
              <TextInput
                placeholder="Username"
                onChangeText={(value) => setUsername(value)}
                value={username}
                style={styles.inputContent}
              />

              <Text style={{ color: "white", fontSize: 20 }}>Email</Text>
              <TextInput
                placeholder="Email"
                value={email} 
                onChangeText= {value => {setEmail(value); handleValidEmail(value)}}
                style={styles.inputContent}
              />
              {emailValidError ? (<Text style={{color: 'red', marginLeft: 200}}>*Wrong format</Text>) : 
              (<Text></Text>)} 
              

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
              onPress={() => handleRegister()} 
            >
              <Text style={styles.register}>Register</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{ flex: 1, height: 2, backgroundColor: "#92C3BC" }}
              />
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate(SigninScreen)} 
                  >
                <Text
                  style={{ width: 150, textAlign: "center", color: "white" }}>
                  Already registered? 
                </Text>
                <Text style={{ width: 150, textAlign: "center", color: "white" }}>
                  Sign In Here
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
    //if token is identified, user already exists and sign in page appears
  } else {
    return (
      <ImageBackground
        source={require("../assets/background-concept.jpg")}
        style={styles.background}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.background}
          >
            <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.background}
      >
            <Image
              source={require("../assets/Munchbox-logo.jpg")}
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

            {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{ flex: 1, height: 2, backgroundColor: "#92C3BC" }}
              />
              <View>
                <Text
                  style={{ width: 150, textAlign: "center", color: "white" }}
                >
                  or sign up with
                </Text>
              </View>
              <View
                style={{ flex: 1, height: 2, backgroundColor: "#92C3BC" }}
              />
            </View> */}
            </LinearGradient>
          </KeyboardAvoidingView> 
        </TouchableWithoutFeedback>
        
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    marginTop: 30,
    width: "100%",
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
    justifyContent: "center",
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

