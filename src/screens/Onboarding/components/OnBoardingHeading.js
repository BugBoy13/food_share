import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FONTS } from '../../../../constants';

const OnBoardingHeading = ({ headerText }) => {

    return (
        <Text
            style={styles.header}>
            {headerText}
        </Text>
    )
}

const styles = StyleSheet.create({
    header: {
        marginLeft: 40,
        marginTop: 100,
        ...FONTS.h2,
        fontWeight: 'bold'
    }
})

export default OnBoardingHeading;