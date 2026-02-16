import { Column } from "@/components/Column";

const Home = () => {
  const choices = ["one", "two", "three", "four", "five"];

  return (
    <div className="flex items-center m-2 sm:m-4 mt-0 flex-col gap-2 sm:gap-4">
      <div className="flex w-full max-w-6xl justify-center-safe overflow-scroll gap-2 sm:gap-4">
        {choices.map((x, i) => (
          <Column key={i} title={x} />
        ))}
      </div>
      <div>Decision: one</div>
    </div>
  );
};

export default Home;
