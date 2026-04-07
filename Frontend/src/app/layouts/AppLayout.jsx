import Navbar from "../../shared/components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../shared/components/Footer/Footer";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}