import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import SignupScreen from "./screens/SignupScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "./screens/Homepage";
import Recettepage from "./screens/Recettepage";
import Placard from "./screens/Placard";
import Filter from "./screens/Filter";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="Recettepage" component={Recettepage} />
        <Stack.Screen name="Filter" component={Filter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
