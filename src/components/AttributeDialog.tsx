"use client";

import { SubmitEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface AttributeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, value: number) => void;
}

const AttributeDialog = (props: AttributeDialogProps) => {
  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const titleRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.onSubmit(title, value);
    setTitle("");
    setValue(0);
  };

  // handle mounting, next-ism
  useEffect(() => {
    setMounted(true);
  }, []);

  // focus on title when we are open
  useEffect(() => {
    if (props.isOpen && titleRef.current) {
      titleRef.current.focus();
    }
  }, [props.isOpen, mounted]);

  // add escape handler to document
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        props.onClose();
      }
    };

    if (props.isOpen) {
      document.addEventListener("keydown", handler);
    }

    return () => document.removeEventListener("keydown", handler);
  }, [props.isOpen, props.onClose]);

  // next-ism
  if (!mounted) return null;

  return createPortal(
    <div
      className={`${props.isOpen || "hidden"} fixed w-full h-full bg-black/50 backdrop-blur-xs
        top-0 flex justify-center items-center`}
      onClick={(e) => {
        if (e.target == e.currentTarget) props.onClose();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 rounded-md p-2 px-4 border-2 border-neutral-300/50 dark:border-neutral-700/50
        bg-neutral-300 dark:bg-neutral-800 shadow-md"
      >
        <div className="text-center">New Attribute</div>
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

export { AttributeDialog };
