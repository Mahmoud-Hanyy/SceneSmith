import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    watchlist: { movies: {}, shows: {} },
    watchlistCount: 0,
  },
  reducers: {
    addMovieToWatchlist: (state, action) => {
      const movieId = action.payload.id;
      const data = action.payload;
      const movieData = {
        title: data.title,
        poster_path: data.poster_path,
        release_date: data.release_date,
        vote_average: data.vote_average,
        overview: data.overview,
      };
      if (state.watchlist["movies"][movieId]) {
        return;
      }
      state.watchlist["movies"][movieId] = movieData;
      state.watchlistCount += 1;
    },
    removeMovieFromWatchlist: (state, action) => {
      const movieId = action.payload.id;
      delete state.watchlist["movies"][movieId];
      state.watchlistCount -= 1;
    },
    addShowToWatchlist: (state, action) => {
      const showId = action.payload.id;
      const data = action.payload;
      const showData = {
        name: data.name,
        poster_path: data.poster_path,
        first_air_date: data.first_air_date,
        vote_average: data.vote_average,
        overview: data.overview,
      };
      if (state.watchlist["shows"][showId]) {
        return;
      }
      state.watchlist["shows"][showId] = showData;
      state.watchlistCount += 1;
    },
    removeShowFromWatchlist: (state, action) => {
      const showId = action.payload.id;
      delete state.watchlist["shows"][showId];
      state.watchlistCount -= 1;
    },
  },
});

export const {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  addShowToWatchlist,
  removeShowFromWatchlist,
} = watchlistSlice.actions;
export default watchlistSlice.reducer;
