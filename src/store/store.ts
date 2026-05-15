import { configureStore } from '@reduxjs/toolkit'
import tabReducer from './slices/tabSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    tabs: tabReducer,
    auth: authReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch