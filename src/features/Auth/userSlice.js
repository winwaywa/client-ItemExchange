import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../api/authApi';

//tạo async action
export const register = createAsyncThunk('/register', async (payload) => {
    // call api to register
    const data = await authApi.register(payload);

    //save data local storage
    localStorage.setItem('access_token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    //return user data
    return data.user;
});

export const login = createAsyncThunk('/login', async (payload) => {
    // call api to register
    const data = await authApi.login(payload);
    console.log(data);
    //save data local storage
    localStorage.setItem('access_token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    //return user data
    return data.user;
});

export const loginWithGoogle = createAsyncThunk('/loginwithgoogle', async (payload) => {
    // call api to register
    const data = await authApi.loginWithGoogle(payload);
    console.log(data);
    //save data local storage
    localStorage.setItem('access_token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    //return user data
    return data.user;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem('user')),
        notification: 0,
        settings: {},
    },
    reducers: {
        logout(state) {
            //clear localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');

            state.current = null;
        },
        updateUser(state, action) {
            console.log(action.payload);
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.current = action.payload;
        },
        updateNotification(state, action) {
            state.notification = action.payload;
        },
    },
    extraReducers: {
        //tự định nghĩa action type (<=> 'user/register/fullfilled')
        [register.fulfilled]: (state, action) => {
            state.current = action.payload; //action.payload = return data.user ở trên
        },
        [login.fulfilled]: (state, action) => {
            state.current = action.payload; //action.payload = return data.user ở trên
        },
        [loginWithGoogle.fulfilled]: (state, action) => {
            state.current = action.payload; //action.payload = return data.user ở trên
        },
    },
});

const { actions, reducer } = userSlice;

export const { logout, updateUser, updateNotification } = actions;

export default reducer; //default export
