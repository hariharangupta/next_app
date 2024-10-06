import Link from "next/link";

const Navbar = () => {
  return (
    <div className="pt-10 px-20 flex flex-col">
      <nav className="bg-slate-300 rounded shadow-md h-12 flex justify-start items-center mb-6">
        <ul
          className="flex justify-start items-center"
          style={{ listStyleType: "none", padding: 0 }}
        >
          <li className="px-10 hover:text-blue-500 transition-colors">
            <Link href="/">Home</Link>
          </li>{" "}
          <li className="px-10 hover:text-blue-500 transition-colors">
            <Link href="/profile">Profile</Link>
          </li>
          <li className="px-10 hover:text-blue-500 transition-colors">
            <Link href="/table">Table Data</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
