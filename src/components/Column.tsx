"use client";

import { useState } from "react";

interface ColumnProps {
  title: string;
}

const Column = (props: ColumnProps) => {
  const [attributes, setAttributes] = useState<number[]>([]);

  const remove = (idx: number) =>
    setAttributes(attributes.filter((_, i) => i != idx));

  const add = () => setAttributes(attributes.concat(attributes.length + 1));

  return (
    <div className="grow max-w-sm min-w-40 sm:min-w-48 md:min-w-52">
      <div
        className="flex flex-col rounded-lg gap-2 bg-neutral-100 dark:bg-neutral-800 p-2 sm:px-4
        border-2 border-neutral-300/50 dark:border-neutral-700/50 shadow-md"
      >
        <div className="text-center sm:p-1">{props.title}</div>
        <ul className="flex flex-col gap-2">
          {attributes.map((x, i) => (
            <li
              key={i}
              className="flex justify-between gap-2 rounded-md py-1 px-2 md:py-2 md:px-4
            bg-neutral-200 dark:bg-neutral-700/50 shadow-md group"
            >
              {x}
              <button
                className="opacity-0 group-hover:opacity-100"
                onClick={() => remove(i)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <button
          className="text-left opacity-50 rounded-md py-1 px-2 hover:bg-neutral-500/10
          hover:opacity-100"
          onClick={() => add()}
        >
          + Attribute
        </button>
      </div>
    </div>
  );
};

export { Column };
