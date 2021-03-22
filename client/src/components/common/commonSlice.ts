import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

interface CommonState {
  isOpenSideBar: boolean;
}

const initialState: CommonState = {
  isOpenSideBar: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsOpenSideBar: (state, action: PayloadAction<boolean>) => {
      state.isOpenSideBar = action.payload;
    },
  },
});

export const { setIsOpenSideBar } = commonSlice.actions;

export const isOpenSideBarStore = (state: RootState) =>
  state.common.isOpenSideBar;

export default commonSlice.reducer;
