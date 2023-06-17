import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div className="mt-0">
            <Header />
            <Outlet />
            <Footer/>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
};

export default MainLayout;