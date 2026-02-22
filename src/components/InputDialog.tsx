"use client";

import { useBoardContext } from "@/app/context";
import { SubmitEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const InputDialog = () => {
  const { dialog, columns, dispatch, closeDialog } = useBoardContext();
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // fill in values if editing
    if (dialog?.type === "edit-col") {
      const col = columns.find((c) => c.id === dialog.columnId);
      setTitle(col?.title ?? "");
    } else if (dialog?.type === "edit-row") {
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

    // scary code but trying to enforce exhaustive type checking
    const action = () => {
      switch (dialog.type) {
        case "add-row":
          return { type: dialog.type, columnId: dialog.columnId, title, value };
        case "edit-row":
          return {
            type: dialog.type,
            columnId: dialog.columnId,
            rowId: dialog.rowId,
            title,
            value,
          };
        case "add-col":
          return { type: dialog.type, title };
        case "edit-col":
          return { type: dialog.type, columndId: dialog.columnId, title };
      }
    };

    dispatch(action());
    closeDialog();
  };

  return createPortal(
    <div
      className={`${dialog || "hidden"} fixed w-dvw h-dvh bg-black/40 backdrop-blur-xs
        top-0 flex justify-center items-center`}
      onClick={(e) => {
        if (e.target == e.currentTarget) closeDialog();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 rounded-xl py-2 px-4 border-2 border-neutral-300/50 dark:border-neutral-700/50
        bg-neutral-300 dark:bg-neutral-800 shadow-md"
      >
        <div className="text-center">
          {dialog.type.startsWith("add") ? "New" : "Edit"}
          {dialog.type.endsWith("row") ? " Reason" : " Column"}
        </div>
        <input
          className="py-1 px-2 rounded-md bg-neutral-200 dark:bg-neutral-700"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={titleRef}
          required
        />
        {dialog.type.endsWith("col") ? null : (
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
        )}
        <div className="flex justify-center">
          <button
            autoFocus
            type="submit"
            className="py-1 px-2 rounded-lg bg-neutral-200 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
};

export { InputDialog };
