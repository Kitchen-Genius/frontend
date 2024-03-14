import storageSession from 'redux-persist/lib/storage/session';
import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: { 
      email: "",
      password: "",
      username: "",
      imgUrl: "",
      id: 0,
      liked: false,
    },
    infor: { 
      json: "",
      ingredientList: [],
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setInfor: (state, action) => { 
      state.infor = action.payload;
    },
  },
});


const userReducer = userSlice.reducer;

const rootPersistConfig = { key: 'root', storage: storageSession };
const rootReducer = persistReducer(rootPersistConfig, userReducer); // Updated here
export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
export const { setUser , setInfor} = userSlice.actions;
