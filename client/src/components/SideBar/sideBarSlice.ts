import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../redux/store';

interface SideBarState {
  isOpenSideBar: boolean;
}

const initialState: SideBarState = {
  isOpenSideBar: false,
};

export const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    setIsOpenSideBar: (state, action: PayloadAction<boolean>) => {
      state.isOpenSideBar = action.payload;
    },
  },
});

export const { setIsOpenSideBar } = sideBarSlice.actions;

export const isOpenSideBarStore = (state: RootState) =>
  state.sideBar.isOpenSideBar;

export default sideBarSlice.reducer;
