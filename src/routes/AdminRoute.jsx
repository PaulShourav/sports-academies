import { useContext } from "react";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({children}) => {
    const {user}=useContext(AuthContext)
    const [isAdmin,isAdminLoading]=useAdmin()
    const location=useLocation()
    
    if( isAdminLoading){
        return <span className="loading loading-spinner text-secondary"></span>
    }
    
    if(user && isAdmin){
        return children
    }
    return <Navigate to={'/'} state={{from:location}} replace></Navigate>
    
};

export default AdminRoute;