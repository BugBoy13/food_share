import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import strings from '../../../constants/strings';
import { Context as UserContext } from '../../context/userContext';
import useUserType from '../../hooks/useUserType';
import MyDonationsScreen from '../Provider/MyDonationsScreen';
import FoodRequestScreen from '../Taker/FoodRequestScreen';
import LastQuestionScreen from './LastQuestionScreen';

const CheckUserType = () => {

    // TODO: save user token here

    const { state } = useContext(UserContext);
    let user_id = state._user.uid;

    const userType = useUserType(user_id);

    if (userType == null) {
        return <LastQuestionScreen />
    }
    else if (userType == strings.PROVIDER) {
        return <MyDonationsScreen />
    }
    else if (userType == strings.TAKER) {
        return <FoodRequestScreen />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CheckUserType;