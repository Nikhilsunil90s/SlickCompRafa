import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './constants';
import getMatchesThunk from './thunks/get-matches';

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    get(state) {
      return { ...state, loading: true };
    },
    set(state, action: PayloadAction<any>) {
      return { ...state, matches: action.payload };
    }
  },
  extraReducers: builder => {
    builder.addCase(getMatchesThunk.fulfilled, (state, action) => {
      return { ...state, matches: action.payload };
    });
  }
})


export const { get, set } = matchesSlice.actions;
export default matchesSlice.reducer;
