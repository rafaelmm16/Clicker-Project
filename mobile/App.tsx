import React from 'react';

import { useFonts } from 'expo-font';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Routes />     
  );
}