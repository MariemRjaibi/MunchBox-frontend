import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect, useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

  //utilisation du SplashScreen pour pouvoir charger la font en arriere plan avant de charger l'app

export default function FontGrand() {
  const [fontsLoaded] = useFonts({
    'Grandhotel': require('../assets/fonts/GrandHotel.ttf'),
  });

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
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={{ fontFamily: 'Grandhotel', fontSize: 34 }}>BATCH CALENDAR</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
titre:{
    padding:150,
    fontFamily:"GrandHotel_400Regular",
}

})




