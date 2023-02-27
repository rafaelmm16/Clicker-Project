import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import main from './Main';
//import shop from './pages/shop';
import profile from './pages/Profile';

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#F2F3F5' } }}>
            <Screen name="Main" component={main} />
                
            </Navigator>
        </NavigationContainer>
    )
}