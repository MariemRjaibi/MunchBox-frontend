import { StatusBar } from "expo-status-bar";
import { useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";

// Redux store
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Redux persiste
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Reducers import
import users from "./reducers/users";
import filters from "./reducers/filters";
import modalFilters from "./reducers/modalFilters";
import Calendar from "./reducers/Calendar";

//Import de font
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback } from "react";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


// Screens import
import ConceptScreen from "./screens/form/ConceptScreen";
import BatchCalendar from "./screens/BatchCalendar";
import Homepage from "./screens/Homepage";
import Recettepage from "./screens/Recettepage";
import Filter from "./screens/Filter";
import FormScreen from "./screens/form/FormScreen";
import SignupScreen from "./screens/SignupScreen";
import ShoppinglistScreen from "./screens/ShoppinglistScreen";
import BatchweekScreen from "./screens/BatchweekScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

import Placard from "./screens/Placard";

// Configuration Reducer Store
const reducers = combineReducers({ users, modalFilters, Calendar });
const persistConfig = { key: "munchbox", storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

// Configuration navigation
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Grandhotel: require("./assets/fonts/GrandHotel.ttf"),
  });
  //utilisation du SplashScreen pour pouvoir charger la font en arriere plan avant de charger l'app
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="FormScreen" component={FormScreen} />
            <Stack.Screen name="batchCalendar" component={BatchCalendar} />
            <Stack.Screen name="Recettepage" component={Recettepage} />
            <Stack.Screen name="ConceptScreen" component={ConceptScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen name="Placard" component={Placard} />
            <Stack.Screen name="Filter" component={Filter} />
            <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
            <Stack.Screen name="ShoppinglistScreen" component={ShoppinglistScreen}/>
            <Stack.Screen name="BatchweekScreen" component={BatchweekScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
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
