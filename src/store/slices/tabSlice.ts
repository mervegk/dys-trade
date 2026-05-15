import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Tab {
  id: string
  title: string
  path: string
}

interface TabsState {
  tabs: Tab[]
  activeTabId: string | null
}

const initialState: TabsState = {
  tabs: [],
  activeTabId: null,
}

const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    openTab(state, action: PayloadAction<Tab>) {
      const exists = state.tabs.find(t => t.id === action.payload.id)
      if (!exists) state.tabs.push(action.payload)
      state.activeTabId = action.payload.id
    },
    closeTab(state, action: PayloadAction<string>) {
      const index = state.tabs.findIndex(t => t.id === action.payload)
      state.tabs.splice(index, 1)

      if (state.activeTabId === action.payload) {
        state.activeTabId = state.tabs[index - 1]?.id
          ?? state.tabs[0]?.id
          ?? null
      }
    },
    switchTab(state, action: PayloadAction<string>) {
      state.activeTabId = action.payload
    },
  },
})

export const { openTab, closeTab, switchTab } = tabsSlice.actions
export default tabsSlice.reducer