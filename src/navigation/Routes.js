import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    CheckUserType,
    IntroScreen,
    LoginScreen,
    VerifyOTPScreen,
    MyDonationsScreen,
    FoodRequestScreen
} from '../screens';

const Stack = createNativeStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Intro"
                screenOptions={{
                    headerShown: false
                }} >
                <Stack.Screen name="Intro" component={IntroScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
                <Stack.Screen name="CheckUserType" component={CheckUserType} />
                <Stack.Screen name="MyDonations" component={MyDonationsScreen} />
                <Stack.Screen name="FoodRequests" component={FoodRequestScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;