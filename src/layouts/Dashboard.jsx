import { NavLink, Outlet,useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import useStudent from "../hooks/useStudent";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import { FaBookOpen, FaBookReader, FaHive, FaHome, FaLaptopMedical, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
    const { user,logOut } = useContext(AuthContext)
    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()
    const [isStudent] = useStudent()
    const navigate = useNavigate()
    const handleLogOut = () => {
        logOut()
            .then(() => {
                // Sign-out successful.
                navigate('/')
            }).catch((error) => {
                // An error happened.
            });
    }
    const navLink = <>
        <div className=" flex flex-col items-center mt-6">
            <img src={user?.photoURL} className=" w-24 h-24 rounded-full border-4 border-teal-600" alt="" />
            <p className="font-bold text-xl uppercase mt-2 mb-5 ">{user?.displayName}</p>
        </div>
        <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to={'/'}><FaHome />
         Home</NavLink ></li>
         <li onClick={handleLogOut}><a ><FaSignOutAlt/> Logout</a></li>
        <hr className="border-t-[1px] border-black my-5" />
        {isAdmin && <>
            <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to={'allUser'}><FaUsers /> All user</NavLink ></li>
            <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to={'allClasses'}><FaBookReader /> All Classes</NavLink></li>
        </>}
        {isInstructor && <>
            <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to={'addClass'}><FaLaptopMedical /> Add Class</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to={'myClasses'}><FaBookOpen /> My Classes</NavLink></li>
        </>}
        {isStudent && <>
            <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to={'selectedClass'}><FaBookOpen /> Selected Class</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to={'enrolledClass'}><FaHive />  Enrolled Classes</NavLink></li>
        </>}
        {/* <li><Link to={'addClass'}>Add Class</Link></li></> */}
    </>
    return (
        <>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="md:p-8 drawer-content flex flex-col items-center ">
                    {/* Page content here */}
                    <div className="">

                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    </div>
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu  p-5  w-80 h-full bg-[#8bf0ba] text-base-content">
                        {/* Sidebar content here */}
                        {navLink}
                    </ul>

                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </>

    );
};

export default Dashboard;