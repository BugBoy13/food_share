import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as UserContext } from '../../context/userContext';
import useUserType from '../../hooks/useUserType';

const CheckUserType = () => {

    // save user token here
    /*
    call API to check User Type
        if data not present, go to question screen
        if data present,
            go to donor and receiver screens
    */

    const { state } = useContext(UserContext);
    let user_id = state._user.uid;

    const userType = useUserType(user_id);
    console.log(userType);

    return (
        <View
            style={styles.container}>
            <Text>CheckUserType</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CheckUserType;