import React from 'react';
import LoginScreen from './LoginScreen';
import CheckUserType from './CheckUserType';
import useAuth from '../../hooks/useAuth';
import { ActivityIndicator } from 'react-native';
import { COLORS } from '../../../constants';


const AuthCheckScreen = ({ navigation }) => {

    const { user, initializing } = useAuth();

    if (initializing) return <ActivityIndicator style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }} size="large" color={COLORS.primary} />;

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