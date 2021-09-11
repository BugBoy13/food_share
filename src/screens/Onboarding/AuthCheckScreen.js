import React, { useContext } from 'react';
import LoginScreen from './LoginScreen';
import CheckUserType from './CheckUserType';
import useAuth from '../../hooks/useAuth';


const AuthCheckScreen = ({ navigation }) => {

    const { user, initializing } = useAuth();

    if (initializing) return null;
    if (!user) {
        return (
            < LoginScreen
                navigation={navigation} />
        )
    }
    else {
        return (
            <CheckUserType
                navigation={navigation} />
        )
    }

}

export default AuthCheckScreen;