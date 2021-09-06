import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Image, TouchableOpacity, ToastAndroid } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

import { FONTS, icons } from '../../../constants';
import OnBoardingHeading from './OnBoardingHeading';
import OnBoardingSubHeading from './OnBoardingSubHeading';

const LoginScreen = ({ navigation }) => {

    const [phone, setPhone] = useState('9818930789');

    const showToast = (toastMessage) => {
        ToastAndroid.show(toastMessage, ToastAndroid.SHORT);
    }

    async function signInWithPhoneNumber(phone) {

        if (phone.length < 10) {
            showToast('Check phone number');
            return;
        }

        try {
            const confirmation = await auth().signInWithPhoneNumber(`+91${phone}`);
            if (confirmation) {
                navigation.navigate('VerifyOTP', { confirmation });
            }
        }
        catch (e) {
            console.log(e);
        }
    }


    return (
        <View
            style={styles.safeArea}>
            <OnBoardingHeading
                headerText="What's your number?" />
            <OnBoardingSubHeading
                headerText="Enter your number below for verification." />
            <View
                style={styles.phoneView}>
                <Text
                    style={styles.phoneCode}>
                    +91
                </Text>
                <TextInput
                    style={styles.inputPhone}
                    autoCompleteType="tel"
                    onChangeText={setPhone}
                    maxLength={10}
                    keyboardType="phone-pad"
                    placeholder="Phone"
                />
            </View>
            <View
                style={styles.nextViewStyle}>
                <LinearGradient
                    colors={['#FF655B', '#FF5864']}
                    style={styles.nextButtonStyle} >
                    <TouchableOpacity
                        onPress={() => signInWithPhoneNumber(phone)} >
                        <Image
                            style={styles.imageStyle}
                            source={icons.forward_arrow_white} />
                    </TouchableOpacity>

                </LinearGradient>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    safeArea: {
        marginVertical: 36
    },
    phoneCode: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 3,
        ...FONTS.h3,
    },
    phoneView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 60,
        marginLeft: 40,
    },
    inputPhone: {
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
    imageStyle: {
        width: 20,
        height: 20,
        margin: 15,
    },
    nextViewStyle: {
        alignItems: 'flex-end'
    }
})

export default LoginScreen;