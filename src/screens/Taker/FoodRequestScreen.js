import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FoodRequestScreen = () => {

    return (
        <View
            style={styles.container}>
            <Text>FoodRequestScreen</Text>
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

export default FoodRequestScreen;