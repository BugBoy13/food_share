import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { COLORS } from '../../../constants';
import OnBoardingHeading from './components/OnBoardingHeading';

const LastQuestionScreen = () => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    return (
        <View
            style={styles.safeArea}>
            <OnBoardingHeading
                headerText="One Last Thing. Promise!" />
            <TextInput
                style={styles.nameStyle}
                placeholder="Name"
                onChangeText={setName} />
            <TextInput
                style={styles.addressStyle}
                placeholder="Address"
                onChangeText={setAddress} />
            <View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        marginVertical: 36
    },
    nameStyle: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        color: COLORS.primary
    },
    addressStyle: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        color: COLORS.primary
    }
})

export default LastQuestionScreen;