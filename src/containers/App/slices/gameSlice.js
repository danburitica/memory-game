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
  score: 0,
  cards: [],
  matchedCards: [],
  flippedCards: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setScore(state, action) {
      state.score = action.payload;
    },
    setCards(state, action) {
      state.cards = action.payload;
    },
    setMatchedCards(state, action) {
      state.matchedCards = action.payload;
    },
    setFlippedCards(state, action) {
      state.flippedCards = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCardsImagesAsync.fulfilled, (state, action) => {
      state.cards = action.payload;
    });
  },
});

export const { setName, setScore, setCards, setMatchedCards, setFlippedCards } =
  gameSlice.actions;

export default gameSlice.reducer;
