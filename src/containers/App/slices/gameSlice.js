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
  hitPoints: 0,
  errorPoints: 0,
  isLoading: false,
  cards: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setHitPoints(state) {
      state.hitPoints += 1;
    },
    setErrorPoints(state) {
      state.errorPoints += 1;
    },
    setCards(state, action) {
      state.cards = action.payload;
    },
    setNewGame(state) {
      state.hitPoints = 0;
      state.errorPoints = 0;
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

export const { setCards, setHitPoints, setErrorPoints, setNewGame } =
  gameSlice.actions;

export default gameSlice.reducer;
