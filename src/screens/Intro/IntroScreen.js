import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from 'react-native-onboarding-swiper';
import { images, strings } from '../../../constants'
import LoginScreen from '../Onboarding/LoginScreen';

const Dots = ({ selected }) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View
            style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16 }}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16 }}>Next</Text>
    </TouchableOpacity>
);

const Done = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16 }}>Done</Text>
    </TouchableOpacity>
);

const IntroScreen = ({ navigation }) => {

    const [isFirstLaunch, setIsFirstLaunch] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched')
            .then(value => {
                if (value == null) {
                    AsyncStorage.setItem('alreadyLaunched', 'true');
                    setIsFirstLaunch(true);
                }
                else {
                    setIsFirstLaunch(false)
                }
            })
    }, [])

    const pages = [
        {
            backgroundColor: '#ffffff',
            image: <Image source={images.intro1} />,
            title: strings.slide1Title,
            subtitle: strings.slide1Text
        },
        {
            backgroundColor: '#ffffff',
            image: <Image source={images.intro2} />,
            title: strings.slide2Title,
            subtitle: strings.slide2Text
        },
        {
            backgroundColor: '#ffffff',
            image: <Image source={images.intro3} />,
            title: strings.slide3Title,
            subtitle: strings.slide3Text
        }
    ]

    if (isFirstLaunch == null) {
        return null
    }
    else if (isFirstLaunch == true) {
        return (
            <Onboarding
                SkipButtonComponent={Skip}
                NextButtonComponent={Next}
                DoneButtonComponent={Done}
                DotComponent={Dots}
                onSkip={() => navigation.replace('Login')}
                onDone={() => navigation.replace('Login')}
                pages={pages}
            />
        )
    }
    else {
        return <LoginScreen />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default IntroScreen;