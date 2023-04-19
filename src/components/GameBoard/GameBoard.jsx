import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import shuffleArray from "../../utils/shuffleArray";
import {
  setErrorPoints,
  setHitPoints,
} from "../../containers/App/slices/gameSlice";
import Modal from "../../utils/modal";

const GameBoard = ({ cards }) => {
  const [gameCards, setGameCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const user = useSelector((state) => state.user.name);
  const hits = useSelector((state) => state.game.hitPoints);
  const misses = useSelector((state) => state.game.errorPoints);
  const dispatch = useDispatch();

  const getMaxGameCards = (initialGameCards) => {
    const halfGameCards = Math.ceil(initialGameCards.length / 2);
    if (window.innerWidth < 1024) {
      return initialGameCards.slice(0, halfGameCards);
    } else {
      return initialGameCards;
    }
  };

  const createGameBoard = async () => {
    const shuffledCards = shuffleArray([...cards]);
    const maxGameCards = getMaxGameCards(shuffledCards);
    const duplicateCards = shuffleArray([...maxGameCards, ...maxGameCards]).map(
      (card, i) => {
        return {
          ...card,
          flipped: false,
          index: i,
        };
      }
    );
    setGameCards(duplicateCards);
    !user && (await Modal.usernameRequestModal({ dispatch }));
  };

  const handleClickCard = (clickedCard) => {
    if (isDisabled) return;

    if (!clickedCard.flipped) {
      clickedCard.flipped = true;

      const currentFlippedCards = [...flippedCards, clickedCard];
      setFlippedCards(currentFlippedCards);

      if (currentFlippedCards.length === 2) {
        setIsDisabled(true);
        if (currentFlippedCards[0].title === currentFlippedCards[1].title) {
          dispatch(setHitPoints());
          setIsDisabled(false);
        } else {
          setTimeout(() => {
            dispatch(setErrorPoints());
            currentFlippedCards[0].flipped = false;
            currentFlippedCards[1].flipped = false;
            setGameCards(gameCards);
            setIsDisabled(false);
          }, 1000);
        }

        setFlippedCards([]);
      }

      setGameCards(gameCards);
    }

    if (gameCards.every((card) => card.flipped)) {
      setTimeout(async () => {
        await Modal.gameOverModal({
          user,
          hits,
          misses,
          createGameBoard,
          setFlippedCards,
          setIsDisabled,
          dispatch,
        });
      }, 1000);
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    createGameBoard();
  }, []);

  return (
    <div className="bg-slate-900 p-6 min-h-screen">
      <h1 className="text-center text-slate-300 font-mono text-4xl md:text-6xl">
        Memory Game
      </h1>
      <ScoreBoard />
      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 gap-3 2xl:gap-4">
        {gameCards.length > 0 &&
          gameCards.map((card) => (
            <Card
              key={card.index}
              card={card}
              handleClickCard={handleClickCard}
            />
          ))}
      </div>
    </div>
  );
};

export default GameBoard;
