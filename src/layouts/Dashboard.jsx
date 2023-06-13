import {Link, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";

const Dashboard = () => {
    const [isAdmin]=useAdmin()
    const [isInstructor]=useInstructor()
    console.log(isAdmin);
    const navLink = <>
        
        {isAdmin?<li><Link to={'allUser'}>All user</Link></li>:''}
        {isInstructor?<li><Link to={'addClass'}>Add Class</Link></li>:''}
        {/* <li><Link to={'addClass'}>Add Class</Link></li></> */}
        </>
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="md:p-8 drawer-content flex flex-col ">
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