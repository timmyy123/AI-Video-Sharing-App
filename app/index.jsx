import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'

const App = () => {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text className='text-3xl font-pblack'>Aora!</Text>
      <StatusBar style='auto'></StatusBar>
      <Link href='/profile' >Go to Profile</Link>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})