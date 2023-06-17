import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaSignOutAlt, FaUserAlt } from "react-icons/fa";


const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    
    const handleLogOut = () => {
        logOut()
            .then(() => {
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
            });
    }
    const navLink = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/instructor'}>Instructor</Link></li>
        <li><Link to={'/classes'}>Classes</Link></li>
        {user && <li><Link to={'dashboard'}>Dashboard</Link></li>}

    </>


    return (
        <header className="fixed z-20 w-full shadow-2xl shadow-green-200 top-0">
            <div className="bg-sky-500 ">
                <div className="flex gap-6 py-[1px] container mx-auto text-sm">
                    <p className="flex items-center"><FaPhone />: +08801853-000000</p>
                    <p className="flex items-center"><FaMapMarkerAlt />: Golsan,Dhaka</p>
                </div>

            </div>
            <div className="bg-sky-500 bg-opacity-75 ">
                <div className="container mx-auto">
                    <div className="navbar  py-0 my-0">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content uppercase mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    {navLink}
                                </ul>
                            </div>
                            <Link to={'/'} className=" uppercase font-bold text-xl md:text-2xl"><span className="text-yellow-500">Sports</span>  Academis</Link>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal uppercase px-1">
                                {navLink}
                            </ul>
                        </div>
                        <div className="navbar-end">
                            {user ? <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-sm btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoURL} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li onClick={handleLogOut}><a ><FaSignOutAlt/> Logout</a></li>
                                </ul>
                            </div> : <Link to={'/signIn&Up'} className="btn btn-sm btn-outline btn-primary flex "><FaUserAlt/> Signin/Up</Link>}
                        </div>
                    </div>
                </div>

            </div>
        </header>


    );
};

export default Header;