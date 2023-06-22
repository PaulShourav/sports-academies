import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useInstructor from "../hooks/useInstructor";


const InstructorRoute = ({children}) => {
    const {user,isLoading}=useContext(AuthContext)
    const [isInstructor,isInstructorLoading]=useInstructor()
    const location=useLocation()
    
    if( isInstructorLoading){
        return <div className="min-h-screen max-w-full flex justify-center items-center">
        <span className="loading loading-spinner text-secondary"></span>
    </div>
    }
    
    if(user && isInstructor){
        return children
    }
    return <Navigate to={'/'} state={{from:location}} replace></Navigate>
    
};

export default InstructorRoute;