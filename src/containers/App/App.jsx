import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameBoard from "../../components/GameBoard/GameBoard";
import ScoreBoard from "../../components/ScoreBoard/ScoreBoard";
import { fetchCardsImagesAsync } from "./slices/gameSlice";

const App = () => {
  const cards = useSelector((state) => state.game.cards);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCardsImagesAsync());
  }, []);

  return (
    <>
      <ScoreBoard />
      <GameBoard cards={cards} />
    </>
  );
};

export default App;
