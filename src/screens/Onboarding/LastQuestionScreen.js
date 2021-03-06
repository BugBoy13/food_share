import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { RadioButton } from 'react-native-paper';

import { COLORS, strings } from '../../../constants';
import useLocation from '../../hooks/useLocation';
import OnBoardingHeading from './components/OnBoardingHeading';
import { Context as UserContext } from '../../context/userContext';
import server from '../../api/server';

const LastQuestionScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [userType, setUserType] = useState('');

    const { state } = useContext(UserContext);
    const user = state;

    const [{
        currentLatitude,
        currentLongitude,
    }, setLocation] = useLocation();

    async function proceed() {

        if (name === '') {
            ToastAndroid.show('Enter name', ToastAndroid.SHORT); return;
        }
        else if (address === '') {
            ToastAndroid.show('Enter address', ToastAndroid.SHORT); return;
        }
        else if (userType === '') {
            ToastAndroid.show('Select option', ToastAndroid.SHORT); return;
        }
        else if (!currentLatitude || !currentLongitude) {
            ToastAndroid.show('Set Location', ToastAndroid.SHORT); return;
        }

        let data = {
            'phone': user._user.phoneNumber.slice(-10),
            'name': name,
            'address': address,
            'userType': userType,
            'location': {
                'latitude': parseFloat(currentLatitude),
                'longitude': parseFloat(currentLongitude)
            },
            'deviceToken': '',
            'userID': user._user.uid
        }

        console.log(data);

        try {
            let response = await server.post('/addUser', data);

            if (response.status == 200) {

                if (userType === strings.PROVIDER) {
                    navigation.replace('MyDonations');
                }
                else if (userType === strings.TAKER) {
                    navigation.replace('FoodRequests');
                }
            }
        }
        catch (e) {
            console.error({ e });
        }
    }

    return (
        <View
            style={styles.safeArea}>
            <OnBoardingHeading
                headerText="One Last Thing. Promise!" />
            <TextInput
                style={styles.nameStyle}
                placeholder="Name"
                value={name}
                onChangeText={setName} />
            <TextInput
                style={styles.addressStyle}
                placeholder="Address"
                value={address}
                onChangeText={setAddress} />
            <View
                style={styles.radioParentStyle} >
                <View
                    style={styles.radioButtonView} >
                    <RadioButton.Android
                        value={strings.PROVIDER}
                        status={userType === strings.PROVIDER ? 'checked' : 'unchecked'}
                        onPress={() => setUserType(strings.PROVIDER)}
                        color={COLORS.primary} />
                    <Text>I want to donate</Text>
                </View>
                <View
                    style={styles.radioButtonView} >
                    <RadioButton.Android
                        value={strings.TAKER}
                        status={userType === strings.TAKER ? 'checked' : 'unchecked'}
                        onPress={() => setUserType(strings.TAKER)}
                        color={COLORS.primary} />
                    <Text>I want to receive</Text>
                </View>
            </View>
            {
                (currentLatitude && currentLongitude)
                    ? <View
                        style={styles.successViewStyle} >
                        <Text
                            style={styles.successTextStyle} >
                            Location set successfully
                        </Text>
                    </View> :
                    <TouchableOpacity
                        onPress={setLocation}>
                        <View
                            style={styles.setLocation} >
                            <Text
                                style={styles.locationTextStyle} >
                                Set Location
                            </Text>
                        </View>
                    </TouchableOpacity>

            }

            <TouchableOpacity
                onPress={proceed}>
                <View>
                    <LinearGradient
                        colors={['#FF655B', '#FF5864']}
                        style={styles.proceedStyle}>
                        <Text
                            style={styles.proceedTextStyle} >
                            Proceed
                        </Text>
                    </LinearGradient>
                </View>
            </TouchableOpacity>
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
    },
    radioParentStyle: {
        marginTop: 20,
        marginLeft: 40
    },
    radioButtonView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    setLocation: {
        marginTop: 40,
        borderWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 40,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 5
    },
    locationTextStyle: {
        color: COLORS.primary,
        fontWeight: 'bold'
    },
    successViewStyle: {
        marginTop: 20,
        alignItems: 'center'
    },
    successTextStyle: {
        color: COLORS.green,
        fontWeight: 'bold'
    },
    proceedStyle: {
        marginTop: 20,
        paddingVertical: 10,
        marginHorizontal: 40,
        alignItems: 'center',
        borderRadius: 5
    },
    proceedTextStyle: {
        color: COLORS.white,
        fontWeight: 'bold'
    }
})

export default LastQuestionScreen;