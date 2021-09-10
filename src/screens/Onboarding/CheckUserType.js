import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CheckUserType = () => {

    // save user token here

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