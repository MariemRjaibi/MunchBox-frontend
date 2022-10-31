// import { StatusBar } from "expo-status-bar";
// import { useReducer } from "react";
// import { StyleSheet, Text, View } from "react-native";

// // Redux store
// import { Provider } from "react-redux";
// import { combineReducers, configureStore } from "@reduxjs/toolkit";

// // Redux persiste
// import { persistStore, persistReducer } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Reducers import
// import users from "./reducers/users";
// import filters from "./reducers/filters";
// import modalFilters from "./reducers/modalFilters";
// import placardIngredients from "./reducers/placardIngredients";
// import favorites from "./reducers/favorites";

// // Navigation
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import BatchCalendar from "./screens/BatchCalendar";
// // Screens import
// import ConceptScreen from "./screens/form/ConceptScreen";
// import Homepage from "./screens/Homepage";
// import Recettepage from "./screens/Recettepage";
// import Filter from "./screens/Filter";
// import RecettepageFiltered from "./screens/RecettepageFiltered";
// import FormScreen from "./screens/form/FormScreen";
// import SignupScreen from "./screens/SignupScreen";
// import ShoppinglistScreen from "./screens/ShoppinglistScreen";
// import BatchweekScreen from "./screens/BatchweekScreen";
// import FavoritesScreen from "./screens/FavoritesScreen";

// import ShoppingList from "./screens/ShoppingList";

// import { shouldUseActivityState } from "react-native-screens";

// import RecipeModal from "./screens/RecipeModal";
// import Placard from "./screens/Placard";

// // Configuration Reducer Store
// const reducers = combineReducers({
//   users,
//   placardIngredients,
//   filters,
//   favorites,
//   modalFilters,
// });
// const persistConfig = { key: "munchbox", storage: AsyncStorage };

// const store = configureStore({
//   reducer: persistReducer(persistConfig, reducers),
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });

// const persistor = persistStore(store);

// // Configuration navigation
// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <NavigationContainer>
//           <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="ConceptScreen" component={ConceptScreen} />
//             <Stack.Screen name="FormScreen" component={FormScreen} />
//             <Stack.Screen name="SignupScreen" component={SignupScreen} />
//             <Stack.Screen name="Homepage" component={Homepage} />
//             <Stack.Screen
//               name="RecettepageFiltered"
//               component={RecettepageFiltered}
//             />

//             <Stack.Screen name="Recettepage" component={Recettepage} />
//             <Stack.Screen name="Placard" component={Placard} />
//             <Stack.Screen name="Filter" component={Filter} />

//             <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
//             <Stack.Screen
//               name="ShoppinglistScreen"
//               component={ShoppinglistScreen}
//             />
//             <Stack.Screen name="BatchweekScreen" component={BatchweekScreen} />
//             <Stack.Screen name="batchCalendar" component={BatchCalendar} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </PersistGate>
//     </Provider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

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
import placardIngredients from "./reducers/placardIngredients";
import favorites from "./reducers/favorites";
import choosePaths from "./reducers/choosePaths";
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
import RecettepageFiltered from "./screens/RecettepageFiltered";
import FormScreen from "./screens/form/FormScreen";
import SignupScreen from "./screens/SignupScreen";
import ShoppinglistScreen from "./screens/ShoppinglistScreen";
import BatchweekScreen from "./screens/BatchweekScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { shouldUseActivityState } from "react-native-screens";
import Placard from "./screens/Placard";

// Configuration Reducer Store
const reducers = combineReducers({
  users,
  placardIngredients,
  filters,
  favorites,
  modalFilters,
  choosePaths,
  Calendar,
});
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

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Favorites") {
            iconName = "heart";
          } else if (route.name === "Calendar") {
            iconName = "calendar";
          } else if (route.name === "Shopping") {
            iconName = "shopping-basket";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#F9D77E",
        tabBarInactiveTintColor: "#335561",
        tabBarStyle: { backgroundColor: "#92C3BC" },

        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Recettepage} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Calendar" component={BatchCalendar} />
      <Tab.Screen name="Shopping" component={ShoppinglistScreen} />
    </Tab.Navigator>
  );
};

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
            <Stack.Screen name="ConceptScreen" component={ConceptScreen} />
            <Stack.Screen name="FormScreen" component={FormScreen} />
            <Stack.Screen name="Recettepage" component={Recettepage} />
            <Stack.Screen name="Filter" component={Filter} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen name="Placard" component={Placard} />
            <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
            <Stack.Screen
              name="ShoppinglistScreen"
              component={ShoppinglistScreen}
            />
            <Stack.Screen name="BatchweekScreen" component={BatchweekScreen} />
            <Stack.Screen name="batchCalendar" component={BatchCalendar} />
            <Stack.Screen name="Filter" component={Filter} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
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
