import createDataContext from "./createDataContext";

import server from '../api/server'

const donationReducer = (state, action) => {

    switch (action.type) {
        case 'get_donations':
            return action.payload;
        default:
            return state;
    }
}

const getDonations = dispatch => {
    return async (user_id) => {

        try {
            const response = await server.get(`/myDonations/${user_id}`);
            dispatch({
                type: 'get_donations',
                payload: response.data
            })
        }
        catch (e) {
            console.error({ e });
        }

    }
}

export const { Context, Provider } = createDataContext(
    donationReducer,
    {
        getDonations
    },
    []
)