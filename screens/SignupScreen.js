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
import SigninScreen from "./SigninScreen";
export default function SignupScreen({ navigation }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailValidError, setEmailValidError] = useState(false);
  const [password, setPassword] = useState("");
  const token = useSelector((state) => state.users.value.token);

  //function that directs new users to signup page
  const handleRegister = () => {
    fetch("https://munch-box-backend.vercel.app/users/signup", {
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
        if (data.result) {
          dispatch(login({ username: username, token: data.token }));
          setUsername("");
          setPassword("");
        }
      });
    if (username && email && password) {
      navigation.navigate(Homepage);
    }
  };

  const handleValidEmail = (value) => {
    let reg =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
                source={require("../assets/logo2blanc.png")}
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
                  onChangeText={(value) => {
                    setEmail(value);
                    handleValidEmail(value);
                  }}
                  style={styles.inputContent}
                />
                {emailValidError ? (
                  <Text style={{ color: "red", marginLeft: 200 }}>
                    *Wrong format
                  </Text>
                ) : (
                  <Text></Text>
                )}

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
                      style={{
                        width: 150,
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      Already registered?
                    </Text>
                    <Text
                      style={{
                        width: 150,
                        textAlign: "center",
                        color: "white",
                      }}
                    >
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
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  containeLogo: {
    paddingTop: 40,
    backgroundColor: "pink",
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
    color: "#fff",
    fontSize: 25,
    padding: 10,
    paddingHorizontal: 50,
    borderTopRightRadius: 45,
    borderBottomLeftRadius: 45,
    marginBottom: 40,
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
