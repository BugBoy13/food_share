import React, { useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import auth from '@react-native-firebase/auth';

import { COLORS, icons } from '../../../constants';
import { Context as UserContext } from '../../context/userContext'
import { Context as DonationsContext } from '../../context/myDonationsContext'
import MyDonationRow from './components/MyDonationRow';
import LinearGradient from 'react-native-linear-gradient';

const MyDonationsScreen = ({ navigation }) => {

    const { deleteUser } = useContext(UserContext);
    const { state, getDonations } = useContext(DonationsContext);

    useEffect(() => {
        getDonations();

        const listener = navigation.addListener('didFocus', () => {
            getDonations();
        });

        return () => {
            // listener.remove();
        };
    }, []);

    function logout() {
        auth().signOut();
        deleteUser();
        navigation.replace('Login');
    }

    return (
        <View
            style={{
                flex: 1
            }} >
            <View
                style={styles.safeArea}>
                <View
                    style={styles.headingView} >
                    <Text
                        style={styles.headingStyle}>Donations</Text>
                    <TouchableOpacity
                        onPress={logout} >
                        <Image
                            style={styles.imageStyle}
                            source={icons.logout_black} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={state}
                    keyExtractor={(donation) => donation.donation_id}
                    renderItem={({ item }) => {
                        return (
                            <MyDonationRow />
                        )
                    }} />
            </View>
            <View
                style={styles.donateNowStyle}>
                <TouchableOpacity
                    style={styles.donateNowClickStyle}
                    onPress={() => { navigation.navigate('AddFood') }} >
                    <LinearGradient
                        colors={['#FF655B', '#FF5864']}
                        style={styles.donateGradientStyle}>
                        <Text
                            style={styles.donationTextStyle}>
                            Donate Now
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        margin: 10
    },
    headingView: {
        marginLeft: 25,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headingStyle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    imageStyle: {
        height: 20,
        width: 20,
        marginRight: 15
    },
    donateNowStyle: {
        flex: 1,
    },
    donateNowClickStyle: {
        position: 'absolute',
        bottom: 40,
        right: 30,
    },
    donateGradientStyle: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30
    },
    donationTextStyle: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default MyDonationsScreen;