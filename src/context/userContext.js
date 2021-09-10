import createDataContext from "./createDataContext";

const userReducer = (state, action) => {

    switch (action.type) {

        case 'save_user':
            return { ...action.payload };
        case 'delete_user':
            return null;
        default:
            return state;
    }
}

const saveUser = dispatch => {
    return (user) => {
        dispatch({
            type: 'save_user',
            payload: user
        })
    }
}

const deleteUser = dispatch => {
    return () => {
        dispatch({
            type: 'delete_user',
            payload: null
        })
    }
}

export const { Context, Provider } = createDataContext(
    userReducer,
    {
        saveUser,
        deleteUser
    },
    null
)