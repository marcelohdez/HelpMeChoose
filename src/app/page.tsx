"use client";

import { Column } from "@/components/Column";
import { useState } from "react";

const Home = () => {
  const [columns, setColumns] = useState<number[]>([]);

  const add = () =>
    columns.length < 5
      ? setColumns(columns.concat(columns.length + 1))
      : console.log("Maximum number of columns reacehed.");

  return (
    <div className="flex items-center flex-col gap-2 sm:gap-4">
      <button
        className="rounded-md py-1 px-2 opacity-50 hover:opacity-100 hover:bg-neutral-500/10"
        onClick={() => add()}
      >
        + Column
      </button>
      <div
        className="flex w-full max-w-7xl justify-center-safe overflow-scroll px-2 sm:px-4
        gap-2 sm:gap-4"
      >
        {columns.map((x, i) => (
          <Column key={i} title={x.toString()} />
        ))}
      </div>
      <div>Decision: one</div>
    </div>
  );
};

export default Home;
