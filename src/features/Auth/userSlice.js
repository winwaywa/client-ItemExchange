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

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem('user')),
        settings: {},
    },
    reducers: {
        logout(state) {
            //clear localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');

            state.current = null;
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
    },
});

const { actions, reducer } = userSlice;

export const { logout } = actions;

export default reducer; //default export
