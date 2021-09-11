import { useState, useEffect, useContext } from 'react';

import auth from '@react-native-firebase/auth';

import { Context as UserContext } from '../context/userContext';

function useAuth() {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    const { saveUser } = useContext(UserContext);

    function onAuthStateChanged(user) {
        setUser(user);
        saveUser(user)
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    return { user, initializing };

}

export default useAuth;