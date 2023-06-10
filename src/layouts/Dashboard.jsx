import {Link, Outlet } from "react-router-dom";

const Dashboard = () => {
    const navLink = <>
        <li><Link to={'allUser'}>All user</Link></li>
        <li><a>Sidebar Item 2</a></li></>
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col ">
                {/* Page content here */}
                <div className="">

                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                </div>
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    {navLink}
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;