"use client";

import { useBoardContext } from "@/app/context";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ReasonDialog = () => {
  const { dialog, columns, dispatch, closeDialog } = useBoardContext();
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // fill in values if editing
    if (dialog?.type === "edit-row") {
      const col = columns.find((c) => c.id === dialog.columnId);
      const row = col?.rows.find((r) => r.id === dialog.rowId);
      setTitle(row?.title ?? "");
      setValue(row?.value ?? 0);
    } else {
      setTitle("");
      setValue(0);
    }

    // focus on title textbox
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [dialog]);

  // add escape handler to document
  useEffect(() => {
    const handler = (e: KeyboardEvent) =>
      e.key === "Escape" ? closeDialog() : null;

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeDialog]);

  if (!dialog) return null;

  const handleSubmit = () => {
    if (!title.trim()) return;

    if (dialog.type === "add-row") {
      dispatch({ type: "add-row", columnId: dialog.columnId, title, value });
    } else if (dialog.type === "edit-row") {
      dispatch({
        type: "edit-row",
        columnId: dialog.columnId,
        rowId: dialog.rowId,
        title,
        value,
      });
    }

    closeDialog();
  };

  return createPortal(
    <div
      className={`${dialog || "hidden"} fixed w-full h-full bg-black/50 backdrop-blur-xs
        top-0 flex justify-center items-center`}
      onClick={(e) => {
        if (e.target == e.currentTarget) closeDialog();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 rounded-md p-2 px-4 border-2 border-neutral-300/50 dark:border-neutral-700/50
        bg-neutral-300 dark:bg-neutral-800 shadow-md"
      >
        <div className="text-center">New Reason</div>
        <input
          className="py-1 px-2 rounded-sm bg-neutral-200 dark:bg-neutral-700"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={titleRef}
          required
        />
        <div className="flex justify-between">
          <p>-1</p>
          <input
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            min="-1"
            max="1"
            name="value"
            type="range"
          />
          <p>+1</p>
        </div>
        <div className="flex justify-center">
          <button
            autoFocus
            type="submit"
            className="py-1 px-2 rounded-md bg-neutral-200 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
};

export { ReasonDialog };
