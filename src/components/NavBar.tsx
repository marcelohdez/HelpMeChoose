import Link from "next/link";

const NavBar = () => (
  <div className="flex m-2 sm:m-4">
    <Link href="/" className="mx-auto">
      Help Me Choose
    </Link>
  </div>
);

export { NavBar };
