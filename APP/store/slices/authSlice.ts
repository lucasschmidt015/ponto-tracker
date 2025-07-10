import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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

const performLogin = async (email: string, password: string): Promise<string | null> => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  if (!API_URL) {
    throw new Error('API URL is not defined');
  }
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    console.log('just after response');

    if (response.status !== 200) {
      console.log('login failed with status code different than 200');
      return null;
    }

    return response.data.access_token;
  } catch (error) {
    return null;
  }
  
}

export const restoreToken = createAsyncThunk('auth/restoreToken', async () => {
    const token = await AsyncStorage.getItem('token');
    return token;
  });
  
  export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {    
    const token = await performLogin(email, password);

    if (!token ) {
      console.log('it is my new throw')
      return null
    }

    await AsyncStorage.setItem('token', token);

    return token;
  }
);
  
  // We'll add a route to perform logout later
  const performLogout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Logout failed:', error);
      throw new Error('Logout failed');
    }
  };

  export const logout = createAsyncThunk('auth/logout', async () => {
    await performLogout();
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