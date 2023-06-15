import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </>
    );
};

export default MainLayout;