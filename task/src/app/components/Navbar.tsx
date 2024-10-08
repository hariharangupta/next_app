import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className=" bg-slate-300 rounded shadow-md h-12  mb-6 flex items-center justify-between  px-20">
      <nav className="">
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
      <div className="">
        <button
          onClick={() => {
            router.push("/login");
            localStorage.clear();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default Navbar;
