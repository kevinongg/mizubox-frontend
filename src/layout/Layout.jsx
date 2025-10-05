import { Outlet } from "react-router";
import Navbar from "./navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
