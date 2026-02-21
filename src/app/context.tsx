import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

type Row = { id: string; title: string; value: number };
type Column = { id: string; title: string; rows: Row[] };

type DialogAction =
  | { type: "add-row"; columnId: string }
  | { type: "edit-row"; columnId: string; rowId: string }
  | null;

type ColumnAction =
  | { type: "load"; columns: Column[] }
  | { type: "add-row"; columnId: string; title: string; value: number }
  | {
      type: "edit-row";
      columnId: string;
      rowId: string;
      title: string;
      value: number;
    }
  | { type: "remove-row"; columnId: string; rowId: string }
  | { type: "add-col"; title: string }
  | { type: "remove-col"; columnId: string };

const dialogReducer = (state: Column[], action: ColumnAction): Column[] => {
  switch (action.type) {
    case "load":
      return action.columns;

    case "add-row":
      return state.map((col) =>
        col.id !== action.columnId
          ? col
          : {
              ...col,
              rows: col.rows.concat({
                id: crypto.randomUUID(),
                title: action.title,
                value: action.value,
              }),
            },
      );

    case "edit-row":
      return state.map((col) =>
        col.id !== action.columnId
          ? col
          : {
              ...col,
              rows: col.rows.map((row) =>
                row.id !== action.rowId
                  ? row
                  : { ...row, title: action.title, value: action.value },
              ),
            },
      );

    case "remove-row":
      return state.map((col) => ({
        ...col,
        rows: col.rows.filter((row) => row.id !== action.rowId),
      }));

    case "add-col":
      return [
        ...state,
        { id: crypto.randomUUID(), title: action.title, rows: [] },
      ];

    case "remove-col":
      return state.filter((col) => col.id !== action.columnId);
  }
};

const BoardContext = createContext<{
  columns: Column[];
  dialog: DialogAction;
  dispatch: React.Dispatch<ColumnAction>;
  openDialog: (d: DialogAction) => void;
  closeDialog: () => void;
} | null>(null);

const BoardContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [columns, dispatch] = useReducer(dialogReducer, []);
  const [dialogState, setDialogState] = useState<DialogAction>(null);

  // load from storage
  useEffect(() => {
    const saved = localStorage.getItem("board0");
    if (saved) {
      dispatch({ type: "load", columns: JSON.parse(saved) });
    }
  }, []);

  // save columns to storage whenever they're changed
  const firstDraw = useRef(true);
  useEffect(() => {
    if (firstDraw.current) {
      firstDraw.current = false;
      return;
    }

    localStorage.setItem("board0", JSON.stringify(columns));
  }, [columns]);

  return (
    <BoardContext.Provider
      value={{
        columns,
        dialog: dialogState,
        dispatch,
        openDialog: setDialogState,
        closeDialog: useCallback(() => setDialogState(null), []),
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

const useBoardContext = () => {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error("context must be used inside a board provider");
  return ctx;
};

export { BoardContextProvider, useBoardContext };
