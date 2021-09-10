import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { COLORS, FONTS, icons } from '../../../constants';

import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

import OnBoardingHeading from './OnBoardingHeading';
import OnBoardingSubHeading from './OnBoardingSubHeading';

import { Context as UserContext } from '../../context/userContext';

const VerifyOTPScreen = ({ route, navigation }) => {

    const { confirmation } = route.params;
    const { saveUser } = useContext(UserContext);

    const [otp, setOtp] = useState('');
    const [counterTime, setCounterTime] = useState('00:30');
    const [counter, setCounter] = useState(30);
    const [retryMessage, setRetryMessage] = useState('');
    const [verifyMessage, setVerifyMessage] = useState('');

    function onAuthStateChanged(user) {
        if (user) {
            saveUser(user);
            navigation.navigate('CheckUserType')
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => {
            if (counter - 1 < 10) {
                setCounterTime(`00:0${counter - 1}`)
            }
            else {
                setCounterTime(`00:${counter - 1}`)
            }

            if (counter - 1 === 0) {
                setRetryMessage('Didn\'t receive OTP? Retry')
            }

            setCounter(counter - 1)
        }, 1000);
        return () => clearInterval(timer);
    }, [counter])

    async function verifyPhoneNumber(otp) {
        try {
            if (otp.length < 6) {
                ToastAndroid.show('Invalid code', ToastAndroid.SHORT);
                return;
            }

            console.log(confirmation, otp);

            await confirmation.confirm(otp);

            setVerifyMessage('Verified!')

        } catch (error) {
            console.log(error);
            if (error.code == 'auth/invalid-verification-code') {
                ToastAndroid.show('Invalid code', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Account linking error', ToastAndroid.SHORT);
            }
        }
    }

    return (
        <View
            style={styles.safeArea}>
            <OnBoardingHeading
                headerText="Verification code" />
            <OnBoardingSubHeading
                headerText="You will get an OTP via SMS" />
            <View
                style={styles.otpParentStyle} >
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
                        maxLength={6}
                        keyboardType="number-pad"
                        placeholder="******"
                    />
                    <Text
                        style={styles.timerStyle} >
                        {counterTime}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.goBack()} >
                    <Text
                        style={styles.resendButtonStyle} >
                        {retryMessage}
                    </Text>
                </TouchableOpacity>

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

                <View
                    style={styles.verifyStyle} >
                    <Text
                        style={styles.verifiedTextStyle} >
                        {verifyMessage}
                    </Text>
                    <LinearGradient
                        colors={['#FF655B', '#FF5864']}
                        style={styles.nextButtonStyle} >
                        <TouchableOpacity
                            onPress={() => verifyPhoneNumber(otp)} >
                            <Image
                                style={styles.imageStyle}
                                source={icons.forward_arrow_white} />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
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
    otpParentStyle: {
        marginTop: 60,
        marginLeft: 40
    },
    otpView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputOtp: {
        fontSize: 16,
        borderBottomWidth: 1,
        width: 200,
        marginLeft: 10,
    },
    timerStyle: {
        color: COLORS.blue,
        fontSize: 12,
        marginLeft: 10
    },
    resendButtonStyle: {
        marginTop: 40,
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.secondary
    },
    verifiedTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.green,
        marginRight: 10,
        height: 30
    },
    verifyStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 40
    },
    nextButtonStyle: {
        height: 50,
        width: 50,
        borderRadius: 30,
        elevation: 10,
        alignItems: 'center'
    },
    previousButtonStyle: {
        height: 50,
        width: 50,
        borderRadius: 50,
        elevation: 10,
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
        flexDirection: 'row',
        alignContent: 'space-around',
        justifyContent: 'space-between',
        marginTop: 60
    }
})

export default VerifyOTPScreen;