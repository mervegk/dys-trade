import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    role: string;
  } | null;
  activeCompany: any;
  permissions: string[];
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  activeCompany: null,
  permissions: [],
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: any; activeCompany: any; permissions: string[] }>) => {
      state.user = action.payload.user;
      state.activeCompany = action.payload.activeCompany;
      state.permissions = action.payload.permissions;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.activeCompany = null;
      state.permissions = [];
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;