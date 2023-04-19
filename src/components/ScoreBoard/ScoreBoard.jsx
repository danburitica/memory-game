import React from "react";
import { useSelector } from "react-redux";

const ScoreBoard = () => {
  const user = useSelector((state) => state.user.name);
  const hits = useSelector((state) => state.game.hitPoints);
  const misses = useSelector((state) => state.game.errorPoints);

  return (
    <>
      {user && (
        <div className="bg-[#2D2FF1] my-6 p-2 rounded-2xl w-80 xl:w-96 overflow-hidden text-center mx-auto font-mono text-slate-50 font-extralight md:text-xl">
          Player: <span className="font-semibold">{user}</span>
        </div>
      )}
      <div className="flex justify-evenly my-4">
        <div className="text-xl md:text-3xl text-emerald-500 font-extralight font-mono">
          🥳 Hits: <span className="font-semibold">{hits}</span>
        </div>
        <div className="text-xl md:text-3xl text-rose-500 font-extralight font-mono">
          😓 Misses: <span className="font-semibold">{misses}</span>
        </div>
      </div>
    </>
  );
};

export default ScoreBoard;
