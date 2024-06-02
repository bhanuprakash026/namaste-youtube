import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: 'nav',
  initialState: {
    isMenuOpen: true,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen
    },
    closeMenu: (state) => {
      state.isMenuOpen = false
    },
    openMenu: (state) => {
      state.isMenuOpen = true
    }
  }
})

export const {toggleMenu, closeMenu, openMenu} = navSlice.actions
export default navSlice.reducer