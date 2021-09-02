import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import LoginScreen from './LoginScreen';
import CheckUserType from './CheckUserType';

const AuthCheckScreen = () => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;
    if (!user) return < LoginScreen />
    else return <CheckUserType />

}

export default AuthCheckScreen;