"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { AttributeDialog } from "./AttributeDialog";
import assert from "assert";

interface ColumnProps {
  id: string;
  onDelete: () => void;
  canDelete: () => boolean;
}

interface Attribute {
  id: number;
  title: string;
  value: number;
}

const FADE_CSS = "opacity-0 pointer-coarse:opacity-30 hover:opacity-100";

const attributeBgCss = (value: number, range: number = 1) => {
  assert(range > 0);

  let result = "bg-neutral-200 dark:bg-neutral-700/50";
  if (value <= -range) {
    result = "bg-red-500/20 dark:bg-red-400/10";
  } else if (value >= range) {
    result = "bg-green-500/20 dark:bg-green-400/10";
  }

  return result;
};

const Column = (props: ColumnProps) => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [attributeId, setAttributeId] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const remove = (idx: number) =>
    setAttributes(attributes.filter((_, i) => i != idx));

  const canAdd = () => attributes.length < 20;

  const add = (title: string, value: number) => {
    if (canAdd()) {
      setAttributeId(attributeId + 1);
      setAttributes(attributes.concat({ id: attributeId, title, value }));
    } else {
      console.log("Maximum number of attributes reached.");
    }
    setDialogOpen(false);
  };

  return (
    <div className="grow max-w-sm min-w-40 sm:min-w-48 md:min-w-52">
      <AttributeDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={add}
      />
      <div
        className="flex flex-col rounded-lg gap-2 bg-neutral-100 dark:bg-neutral-800 p-2 sm:px-4
        border-2 border-neutral-300/50 dark:border-neutral-700/50 shadow-md group/column"
      >
        <div className="text-center text-4xl md:text-5xl -mt-6 sm:-mt-8">
          😐
        </div>
        <div className="grid grid-cols-3 sm:p-1">
          {/* TODO: Implement dragging */}
          {/* <button className="justify-self-start opacity-30 hover:cursor-grab"> */}
          {/*   <FaGripVertical /> */}
          {/* </button> */}
          <p className="justify-self-center col-start-2">{props.id}</p>
          <button
            className={
              props.canDelete()
                ? `${FADE_CSS} group-hover/column:opacity-30  justify-self-end col-start-3`
                : "hidden"
            }
            onClick={() => props.onDelete()}
          >
            <FaTrash />
          </button>
        </div>
        <ul className="flex flex-col gap-2">
          {attributes.map((x, i) => (
            <li
              key={x.id}
              className={`flex justify-between gap-2 rounded-md py-1 px-2 md:py-2 md:px-4
                shadow-md group/attribute ${attributeBgCss(x.value)}`}
            >
              {x.title}
              <button
                className={`${FADE_CSS} group-hover/attribute:opacity-30`}
                onClick={() => remove(i)}
              >
                <FaX />
              </button>
            </li>
          ))}
        </ul>
        <button
          className={`text-left opacity-50 rounded-md py-1 px-2 ${
            canAdd() ? "hover:bg-neutral-500/10 hover:opacity-100" : "hidden"
          }`}
          onClick={() => setDialogOpen(true)}
        >
          + Attribute
        </button>
      </div>
    </div>
  );
};

export { Column };
