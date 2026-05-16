import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    role: string;
  } | null;
  activeCompany: number | null;
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
    setAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
      Object.assign(state, action.payload)

      state.isAuthenticated = !!state.user
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