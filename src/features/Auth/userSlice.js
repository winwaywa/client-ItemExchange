import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import userApi from 'api/userApi';
// import StorageKeys from 'constants/storage-keys';

// //tạo async action
// export const register = createAsyncThunk('user/register', async (payload) => {
//     // call api to register
//     const data = await userApi.register(payload);

//     //save data local storage
//     localStorage.setItem(StorageKeys.TOKEN, data.jwt);
//     localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

//     //return user data
//     return data.user;
// });

// export const login = createAsyncThunk('user/login', async (payload) => {
//     // call api to register
//     const data = await userApi.login(payload);

//     //save data local storage
//     localStorage.setItem(StorageKeys.TOKEN, data.jwt);
//     localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

//     //return user data
//     return data.user;
// });

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
      localStorage.removeItem('jwt');

      state.current = null;
    },
    login(state, action) {
      // localStorage.setItem('jwt', payload.jwt);
      localStorage.setItem('user', JSON.stringify(action.payload));

      state.current = action.payload;
    },
  },
  //   extraReducers: {
  //     //tự định nghĩa action type (<=> 'user/register/fullfilled')
  //     [register.fulfilled]: (state, action) => {
  //       state.current = action.payload; //action.payload = return data.user ở trên
  //     },
  //     [login.fulfilled]: (state, action) => {
  //       state.current = action.payload; //action.payload = return data.user ở trên
  //     },
  //   },
});

const { actions, reducer } = userSlice;

export const { logout, login } = actions;

export default reducer; //default export
