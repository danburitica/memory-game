import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameBoard from "../../components/GameBoard/GameBoard";
import { fetchCardsImagesAsync } from "./slices/gameSlice";

const App = () => {
  const cards = useSelector((state) => state.game.cards);
  const isLoading = useSelector((state) => state.game.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCardsImagesAsync())
      .catch((error) => {
        console.error("Error fetching cards images: ", error);
      });
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src="/loader.svg" alt="Loading..." className="w-20 h-20" />
      </div>
    );
  }

  if (!cards.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Error loading cards. Please try again later.</p>
      </div>
    );
  }

  return <GameBoard cards={cards} />;
};

export default App;
