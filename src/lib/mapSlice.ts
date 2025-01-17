import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MapState {
  center: { lat: number; lng: number };
  zoomLevel: number;
}

const initialState: MapState = {
  center: { lat: 37.5665, lng: 126.978 }, // Seoul coordinates
  zoomLevel: 10,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMapCenter: (
      state,
      action: PayloadAction<{ lat: number; lng: number }>
    ) => {
      state.center = action.payload;
    },
    setZoomLevel: (state, action: PayloadAction<number>) => {
      state.zoomLevel = action.payload;
    },
  },
});

export const { setMapCenter, setZoomLevel } = mapSlice.actions;

export default mapSlice.reducer;
