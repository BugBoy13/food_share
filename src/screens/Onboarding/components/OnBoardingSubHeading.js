import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FONTS } from '../../../../constants';

const OnBoardingSubHeading = ({ headerText }) => {

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
        marginTop: 10,
        ...FONTS.h3,
    }
})

export default OnBoardingSubHeading;