import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";

const Main = () => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes("signin") ||
    location.pathname.includes("signup");

  return (
    <div>
      {noHeaderFooter || <NavBar />}
      <Outlet></Outlet>
      {noHeaderFooter || <Footer />}
    </div>
  );
};

export default Main;
