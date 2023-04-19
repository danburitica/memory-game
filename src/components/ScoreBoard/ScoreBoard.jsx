import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const UserName = ({ name }) => {
  return (
    <div className="bg-[#2D2FF1] my-6 p-2 rounded-2xl w-80 xl:w-96 overflow-hidden text-center mx-auto font-mono text-slate-50 font-extralight md:text-xl">
      Player:{" "}
      <span role="text" className="font-semibold">
        {name}
      </span>
    </div>
  );
};

const ScoreBoard = () => {
  const user = useSelector((state) => state.user.name);
  const hits = useSelector((state) => state.game.hits);
  const misses = useSelector((state) => state.game.errors);

  const memoizedHits = useMemo(() => hits, [hits]);
  const memoizedMisses = useMemo(() => misses, [misses]);

  return (
    <>
      {user && <UserName name={user} />}
      <div className="flex justify-evenly my-4">
        <div className="text-xl md:text-3xl text-emerald-500 font-extralight font-mono">
          🥳 Hits:{" "}
          <span role="text" className="font-semibold">
            {memoizedHits}
          </span>
        </div>
        <div className="text-xl md:text-3xl text-rose-500 font-extralight font-mono">
          😓 Misses:{" "}
          <span role="text" className="font-semibold">
            {memoizedMisses}
          </span>
        </div>
      </div>
    </>
  );
};

export default ScoreBoard;
