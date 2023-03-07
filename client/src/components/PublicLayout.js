import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

const PublicLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default PublicLayout;
