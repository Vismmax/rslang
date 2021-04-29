import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../redux/store';

interface RouteState {
  backRoute: string;
}

const initialState: RouteState = {
  backRoute: '',
};

export const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setBackRoute: (state, action: PayloadAction<string>) => {
      state.backRoute = action.payload;
    },
  },
});

export const { setBackRoute } = routeSlice.actions;

export const backRouteStore = (state: RootState) => state.route.backRoute;

export default routeSlice.reducer;
