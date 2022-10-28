import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    useFonts, GrandHotel_400Regular    
  } from '@expo-google-fonts/grand-hotel';
  

export default function ShoppingList() {
  return (
    <View>
      <Text style={styles.titre}>ShoppingList</Text>
    </View>
  )
}

const styles = StyleSheet.create({
titre:{
    padding:150,
    fontFamily:"GrandHotel_400Regular",
}

})