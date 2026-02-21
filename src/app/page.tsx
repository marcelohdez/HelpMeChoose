"use client";

import { BoardContextProvider } from "./context";
import { Board } from "@/components/Board";

const Home = () => {
  return (
    <BoardContextProvider>
      <Board />
    </BoardContextProvider>
  );
};

export default Home;
