import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { FONTS, icons } from '../../../constants';

import LinearGradient from 'react-native-linear-gradient';

import OnBoardingHeading from './OnBoardingHeading';
import OnBoardingSubHeading from './OnBoardingSubHeading';

const VerifyOTPScreen = ({ navigation }) => {

    const [otp, setOtp] = useState(null);

    return (
        <View
            style={styles.safeArea}>
            <OnBoardingHeading
                headerText="Verification code" />
            <OnBoardingSubHeading
                headerText="You will get an OTP via SMS" />
            <View
                style={styles.otpView}>
                <Text
                    style={styles.otpCode}>
                    OTP:
                </Text>
                <TextInput
                    style={styles.inputOtp}
                    autoCompleteType="tel"
                    onChangeText={setOtp}
                    maxLength={10}
                    keyboardType="phone-pad"
                    placeholder="******"
                />
            </View>
            <View
                style={styles.nextViewStyle}>
                <LinearGradient
                    colors={['#FFFFFF', '#FFFFFF']}
                    style={styles.previousButtonStyle}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()} >
                        <Image
                            style={styles.imageStyle}
                            source={icons.back_arrow_black} />
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                    colors={['#FF655B', '#FF5864']}
                    style={styles.nextButtonStyle} >
                    <TouchableOpacity
                        onPress={() => console.log()} >
                        <Image
                            style={styles.imageStyle}
                            source={icons.forward_arrow_white} />
                    </TouchableOpacity>

                </LinearGradient>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    safeArea: {
        marginVertical: 36
    },
    otpCode: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 3,
        ...FONTS.h3,
    },
    otpView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 60,
        marginLeft: 40,
    },
    inputOtp: {
        fontSize: 16,
        borderBottomWidth: 1,
        width: 200,
        marginLeft: 10
    },
    nextButtonStyle: {
        height: 50,
        width: 50,
        borderRadius: 30,
        elevation: 10,
        marginTop: 100,
        marginRight: 40,
        alignItems: 'center'
    },
    previousButtonStyle: {
        height: 50,
        width: 50,
        borderRadius: 50,
        elevation: 10,
        marginTop: 100,
        marginLeft: 40,
        alignItems: 'center'
    },
    imageStyle: {
        width: 20,
        height: 20,
        borderRadius: 50,
        margin: 15,
    },
    nextViewStyle: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'space-around',
        justifyContent: 'space-between'
    }
})

export default VerifyOTPScreen;