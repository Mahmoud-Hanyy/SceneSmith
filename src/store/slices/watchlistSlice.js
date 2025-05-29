import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    moviesWatchlist: [],
    tvshowsWatchlist: [],
    watchlistCount: 0,
  },
  reducers: {
    addMovieToWatchlist: (state, action) => {
      const movieData = action.payload;
      state.moviesWatchlist.push(movieData);
      state.watchlistCount += 1;
    },
  },
});

export const { addMovieToWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
