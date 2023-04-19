import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameBoard from "../../components/GameBoard/GameBoard";
import { fetchCardsImagesAsync } from "./slices/gameSlice";

const App = () => {
  const cards = useSelector((state) => state.game.cards);
  const isLoading = useSelector((state) => state.game.isLoading);
  const [isCardsLoaded, setIsCardsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCardsImagesAsync())
      .then(() => {
        setIsCardsLoaded(true);
      })
      .catch((error) => {
        cconsole.error("Error fetching cards images: ", error);
      });
  }, [dispatch]);

  if (!isCardsLoaded || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src="/loader.svg" alt="loading..." className="w-20 h-20" />
      </div>
    );
  }

  return <GameBoard cards={cards} />;
};

export default App;
