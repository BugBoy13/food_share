import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import strings from '../../../constants/strings';
import { Context as UserContext } from '../../context/userContext';
import useUserType from '../../hooks/useUserType';
import MyDonationsScreen from '../Provider/MyDonationsScreen';
import FoodRequestScreen from '../Taker/FoodRequestScreen';
import LastQuestionScreen from './LastQuestionScreen';

const CheckUserType = ({ navigation }) => {

    // TODO: save user token here

    const { state } = useContext(UserContext);
    let user_id = state._user.uid;

    const { userType, isLoading } = useUserType(user_id);

    if (isLoading) {
        return <ActivityIndicator style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }} size="large" color={COLORS.primary} />;;
    }

    if (userType == null) {
        return <LastQuestionScreen navigation={navigation} />
    }
    else if (userType == strings.PROVIDER) {
        return <MyDonationsScreen navigation={navigation} />
    }
    else if (userType == strings.TAKER) {
        return <FoodRequestScreen navigation={navigation} />
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