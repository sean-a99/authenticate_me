// ACTION TYPES
const RECEIVE_USER = 'users/RECEIVE_USER';
const REMOVE_USER = 'users/REMOVE_USER';

// THUNK ACTION CREATOR
export const loginUser = user => async dispatch => {
    const res = await csrfFetch('api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    let data = await res.json();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user))
    dispatch(receiveUser(data))
}

export const logoutUser = userId => async dispatch => {
    const res = await csrfFetch('api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser(userId))
}

export const createUser = user => async dispatch => {
    const res = await csrfFetch('api/users', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    const data = await res.json();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user));
    dispatch(receiveUser(data));
}


// ACTION CREATORS
export const receiveUser = user => ({
    type: RECEIVE_USER,
    user: user
});

export const removeUser = userId => ({
    type: REMOVE_USER,
    userId: userId
})

//REDUCER
const usersReducer = (state={}, action) => {
    const nextState = { ...state };

    switch (action.type) {
        case RECEIVE_USER:
            nextState[action.user.id] = action.user;
            return nextState;
        case REMOVE_USER:
            delete nextState[action.userId];
            return nextState;
        default:
            return state;
        
    }
}

export default usersReducer;