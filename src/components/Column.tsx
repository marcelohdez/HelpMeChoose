"use client";

import { FaTrash } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import assert from "assert";
import { useBoardContext } from "@/app/context";

interface ColumnProps {
  id: string;
  title: string;
  onDelete: () => void;
  canDelete: () => boolean;
}

const FADE_CSS = "opacity-0 pointer-coarse:opacity-30 hover:opacity-100";

const rowBgCss = (value: number, range: number = 1) => {
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
  const { columns, dispatch, openDialog } = useBoardContext();
  const column = columns.find((c) => c.id === props.id);

  if (!column) return null;

  const canAdd = () => column?.rows.length < 20;

  return (
    <div className="flex-1 max-w-sm min-w-40 sm:min-w-48 md:min-w-52">
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
          <p className="justify-self-center col-start-2">{props.title}</p>
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
          {column.rows.map((x) => (
            <li
              key={x.id}
              className={`flex justify-between gap-2 rounded-md py-1 px-2 md:py-2 md:px-4
                shadow-md group/row ${rowBgCss(x.value)}`}
              onClick={() =>
                openDialog({
                  type: "edit-row",
                  columnId: column.id,
                  rowId: x.id,
                })
              }
            >
              {x.title}
              <button
                className={`${FADE_CSS} group-hover/row:opacity-30`}
                onClick={() =>
                  dispatch({ type: "remove-col", columnId: column.id })
                }
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
          onClick={() => openDialog({ type: "add-row", columnId: column.id })}
        >
          + Reason
        </button>
      </div>
    </div>
  );
};

export { Column };
