import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  isLoading: true,
};

export const restoreToken = createAsyncThunk('auth/restoreToken', async () => {
    const token = await AsyncStorage.getItem('token');
    return token;
  });
  
  export const login = createAsyncThunk('auth/login', async (token: string) => {
    await AsyncStorage.setItem('token', token);
    return token;
  });
  
  export const logout = createAsyncThunk('auth/logout', async () => {
    await AsyncStorage.removeItem('token');
  });

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(restoreToken.fulfilled, (state, action: PayloadAction<string | null>) => {
          state.token = action.payload;
          state.isAuthenticated = !!action.payload;
          state.isLoading = false;
        })
        .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
          state.token = action.payload;
          state.isAuthenticated = true;
          state.isLoading = false;
        })
        .addCase(logout.fulfilled, state => {
          state.token = null;
          state.isAuthenticated = false;
          state.isLoading = false;
        });
    },
  });
  
  export default authSlice.reducer;