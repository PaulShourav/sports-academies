import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";


const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    const [isAdmin,isAdminLoading]=useAdmin()
    const [isInstructor,isInstructorLoading]=useInstructor()
    const handleLogOut = () => {
        logOut()
            .then(() => {
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
            });
    }
    const navLink=<>
     <li><Link to={'/'}>Home</Link></li>
     <li><Link to={'/instructor'}>Instructor</Link></li>
     <li><Link to={'/classes'}>Classes</Link></li>
     {isAdmin && isInstructor?<li><Link to={'/'}>Classes</Link></li>:""}
     {user?<div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li onClick={handleLogOut}><a>Logout</a></li>
      </ul>
    </div>:<li className="btn btn-sm btn-secondary"><Link to={'/signIn&Up'}>Signin/Up</Link></li>}
    </>
    
    
    return (
        <div className="navbar py-0 bg-blue-300 container mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navLink}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl font-bold">SPORTS <span>ACADEMES</span></a>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal  px-1">
                    {navLink}
                </ul>
            </div>
          
        </div>
    );
};

export default Header;