import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchCardsImages from "../services/gameService";

export const fetchCardsImagesAsync = createAsyncThunk(
  "game/fetchCardsImages",
  async () => {
    const cards = await fetchCardsImages();
    return cards;
  }
);

const initialState = {
  hits: 0,
  errors: 0,
  isLoading: false,
  cards: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementHits(state) {
      state.hits += 1;
    },
    incrementErrors(state) {
      state.errors += 1;
    },
    setCards(state, action) {
      state.cards = action.payload;
    },
    resetGame(state) {
      state.hits = 0;
      state.errors = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardsImagesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCardsImagesAsync.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCardsImagesAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setCards, incrementHits, incrementErrors, resetGame } =
  gameSlice.actions;

export default gameSlice.reducer;
