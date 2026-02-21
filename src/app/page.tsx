"use client";

import { DecisionContextProvider } from "./context";
import { Board } from "@/components/Board";

const Home = () => {
  return (
    <DecisionContextProvider>
      <Board />
    </DecisionContextProvider>
  );
};

export default Home;
