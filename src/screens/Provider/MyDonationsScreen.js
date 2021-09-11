import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyDonationsScreen = () => {

    return (
        <View
            style={styles.container}>
            <Text>MyDonationsScreen</Text>
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

export default MyDonationsScreen;