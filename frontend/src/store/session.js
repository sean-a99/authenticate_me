import csrfFetch from './csrf';

export const SET_SESSION_USER = 'session/SET_SESSION_USER';
export const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';

export const setSessionUser = user => ({
    type: SET_SESSION_USER,
    user
})

export const RemoveSessionUser = () => ({
    type: REMOVE_SESSION_USER
})

export const login = (user) => async dispatch => {
    const { credential, password } = user
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({credential, password})
    });
    const data = await res.json();
    dispatch(setSessionUser(data.user))
};

const initialState = { user: null }

const sessionReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_SESSION_USER:
            return { ...state, user: action.user };
        case REMOVE_SESSION_USER:
            return { ...state, user: null }
        default:
            return state
    }
}

export default sessionReducer;