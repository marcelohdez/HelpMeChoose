"use client";

import { Column } from "@/components/Column";
import { useState } from "react";

const Home = () => {
  const [columns, setColumns] = useState([0, 1]);
  const [id, setId] = useState(columns.length);

  const canAdd = () => columns.length < 5;
  const canRemove = () => columns.length > 2;

  const add = () => {
    if (canAdd()) {
      setId(id + 1);
      setColumns(columns.concat(id));
    } else {
      console.log("Maximum number of columns reacehed.");
    }
  };

  const remove = (idx: number) =>
    canRemove()
      ? setColumns(columns.filter((_, i) => i != idx))
      : console.log("You already have the minimum amount of columns.");

  return (
    <div className="flex items-center flex-col">
      <button
        className={`rounded-md border-2 border-neutral-50/0 py-1 px-2 opacity-50 ${
          canAdd()
            ? "hover:opacity-100 hover:border-neutral-500/20 hover:bg-neutral-500/10"
            : ""
        }`}
        onClick={() => add()}
      >
        + Column
      </button>
      <div
        className="flex w-full max-w-7xl justify-center-safe overflow-x-scroll p-2 sm:p-4
        pt-6 sm:pt-8 gap-2 sm:gap-4 "
      >
        {columns.map((x, i) => (
          <Column
            key={x}
            id={x.toString()}
            onDelete={() => remove(i)}
            canDelete={canRemove}
          />
        ))}
      </div>
      <div>Decision: one</div>
    </div>
  );
};

export default Home;
