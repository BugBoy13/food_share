import { useState, useEffect } from "react";

import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from "react-native";

const useLocation = () => {

    const [currentLongitude, setCurrentLongitude] = useState(null);
    const [currentLatitude, setCurrentLatitude] = useState(null);

    const [click, setClick] = useState(true);

    const handleClick = () => {
        setClick(!click);
    };

    useEffect(() => {
        const requestLocationPermission = async () => {

            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Access Required',
                        message: 'This App needs to Access your location',
                    }
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getOneTimeLocation();
                }
            }
            catch (e) {
                console.error({ e });
            }
        }

        requestLocationPermission();
    }, [click])

    const getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {

                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);

                setCurrentLongitude(currentLongitude);
                setCurrentLatitude(currentLatitude);
            },
            (error) => {
                console.log({ error });
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };

    return [{ currentLatitude, currentLongitude }, handleClick]
}

export default useLocation;