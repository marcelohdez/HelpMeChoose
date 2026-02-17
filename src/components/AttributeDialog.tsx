"use client";

import { SubmitEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface AttributeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
}

const AttributeDialog = (props: AttributeDialogProps) => {
  const [render, setRender] = useState(false);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const json = Object.fromEntries(formData.entries());
    e.target.reset();
    props.onSubmit(json["title"].toString());
  };

  useEffect(() => {
    setRender(true);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.onClose();
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  });

  return render
    ? createPortal(
        <div
          className={`${props.isOpen || "hidden"} fixed w-full h-full bg-black/50 backdrop-blur-xs top-0 flex justify-center items-center`}
        >
          <div className="rounded-md p-2 px-4 border-2 border-neutral-300/50 dark:border-neutral-700/50 bg-neutral-300 dark:bg-neutral-800 shadow-md">
            <form onSubmit={handleSubmit}>
              <div>New Attribute</div>
              <input
                className="rounded-sm bg-neutral-500/50"
                name="title"
              ></input>
              <button type="submit">Done</button>
            </form>
          </div>
        </div>,
        document.body,
      )
    : null;
};

export { AttributeDialog };
