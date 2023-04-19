import React from "react";
import backCard from "./assets/backCard.webp";

const Card = React.memo(({ card, handleClickCard }) => {
  return (
    <div
      className="aspect-square cursor-pointer [perspective:1000px] max-w-[10rem] ml-2"
      onClick={() => handleClickCard(card)}
    >
      <div
        className={`relative w-full h-full duration-700 [transform-style:preserve-3d] ${
          card.flipped && "[transform:rotateY(180deg)]"
        }`}
      >
        <div className="absolute w-full h-full rounded-md [backface-visibility:hidden] shadow-slate-500 shadow-sm [transform:rotateY(180deg)]">
          <img
            src={card.src}
            className="w-full h-full object-cover rounded-lg"
            alt={card.alt}
          />
        </div>
        <div className="absolute w-full h-full rounded-md [backface-visibility:hidden] shadow-slate-500 shadow-sm duration-500 hover:scale-105">
          <img
            src={backCard}
            className="w-full h-full object-cover rounded-lg"
            alt="Card face down"
          />
        </div>
      </div>
    </div>
  );
});

export default Card;
