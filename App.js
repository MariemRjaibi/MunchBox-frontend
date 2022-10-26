import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ConceptScreen from "./screens/form/ConceptScreen";
import Homepage from "./screens/Homepage";
import Recettepage from "./screens/Recettepage";
import Filter from "./screens/Filter";
import FormScreen from "./screens/form/FormScreen";
import SignupScreen from "./screens/SignupScreen";
import Placard from "./screens/Placard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="ConceptScreen" component={ConceptScreen} />
        <Stack.Screen name="FormScreen" component={FormScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} /> */}
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Recettepage" component={Recettepage} />
        <Stack.Screen name="Placard" component={Placard} />
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
