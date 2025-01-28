import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface state {
  isLoading: boolean,
}

const initialState: state = {
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
        finishLoading: (state) => {
      state.isLoading = false
    },

  },
});

export const {finishLoading} = authSlice.actions;
export default authSlice.reducer;
