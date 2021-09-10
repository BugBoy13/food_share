import React, { useContext } from 'react';
import LoginScreen from './LoginScreen';
import CheckUserType from './CheckUserType';
import { Context as UserContext } from '../../context/userContext';

const AuthCheckScreen = ({ navigation }) => {

    const { state } = useContext(UserContext);

    if (initializing) return null;
    if (!state) {
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