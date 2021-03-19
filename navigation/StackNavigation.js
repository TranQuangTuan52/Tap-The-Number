import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Home from '../screens/Home'
import Splash from '../screens/Splash'
const StackNavigation = () => {
    return (
        <Stack.Navigator screenOptions = {{ headerShown: false}}>           
            <Stack.Screen name='Splash' component={Splash} />
            <Stack.Screen name='Home' component = {Home} />
        </Stack.Navigator>
    )
}

export default StackNavigation

