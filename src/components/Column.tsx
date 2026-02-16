interface ColumnProps {
  title: string;
}

const Column = (props: ColumnProps) => {
  const attributes = ["one", "two", "three"];

  return (
    <div
      className="grow rounded-lg gap-2 max-w-md min-w-40 sm:min-w-48
      bg-neutral-100 dark:bg-neutral-800 p-3 px-4 sm:p-4 sm:px-6 border
      border-neutral-300 dark:border-neutral-700 drop-shadow-md "
    >
      <div className="mb-1">I am option {props.title}</div>
      <ul>
        {attributes.map((x, i) => (
          <div
            key={i}
            className="mb-2 rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-neutral-200 dark:bg-neutral-700"
          >
            {x}
          </div>
        ))}
      </ul>
      <button className="opacity-50 hover:opacity-100 hover:px-2">
        + Attribute
      </button>
    </div>
  );
};

export { Column };
