import { useBoardContext } from "@/app/context";
import { Column } from "./Column";
import { InputDialog } from "./InputDialog";

const Board = () => {
  const { columns, dispatch, openDialog } = useBoardContext();

  const canAdd = () => columns.length < 5;
  const canRemove = () => columns.length > 2;

  const add = () => {
    if (canAdd()) {
      openDialog({ type: "add-col" });
    } else {
      console.log("Maximum number of columns reacehed.");
    }
  };

  const remove = (columnId: string) =>
    canRemove()
      ? dispatch({ type: "remove-col", columnId })
      : console.log("You already have the minimum amount of columns.");

  return (
    <div className="flex grow items-center flex-col">
      <InputDialog />
      <button
        className={`rounded-lg border-2 border-neutral-50/0 py-1 px-2 opacity-50 ${
          canAdd()
            ? "hover:opacity-100 hover:border-neutral-500/20 hover:bg-neutral-500/10"
            : ""
        }`}
        onClick={() => add()}
      >
        {canAdd() ? "+ Column" : "Max Columns"}
      </button>
      <div
        className="flex grow w-full max-w-7xl justify-center-safe overflow-x-scroll
        p-2 sm:p-4 pt-6 sm:pt-8 gap-2 sm:gap-4"
      >
        {columns.map((x) => (
          <Column
            key={x.id}
            id={x.id}
            title={x.title}
            onDelete={() => remove(x.id)}
            canDelete={canRemove}
          />
        ))}
      </div>
    </div>
  );
};

export { Board };
