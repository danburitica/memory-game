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
    setHitPoints(state, action) {
      state.hitPoints = action.payload;
    },
    setErrorPoints(state, action) {
      state.errorPoints = action.payload;
    },
    setCards(state, action) {
      state.cards = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
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

export const { setName, setScore, setCards, setMatchedCards, setFlippedCards } =
  gameSlice.actions;

export default gameSlice.reducer;
