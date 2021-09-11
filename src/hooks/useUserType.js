import { useState, useEffect } from 'react';
import server from '../api/server'

function useUserType(user_id) {

    const [userType, setUserType] = useState(null);

    useEffect(async () => {

        try {
            let response = await server.get(`/checkUserType/${user_id}`);
            if (response.status == 201) {
                setUserType(null);
            }

            if (response.status == 200) {
                setUserType(response.data.user_type);
            }
        }
        catch (error) {
            console.error({ error });

            setUserType(null);
        }

    }, [])

    return userType;

}

export default useUserType;