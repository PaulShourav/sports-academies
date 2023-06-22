import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useStudent from "../hooks/useStudent";
import { Navigate, useLocation } from "react-router-dom";


const StudentRoute = ({children}) => {
    const {user,isLoading}=useContext(AuthContext)
    const [isStudent,isStudentLoading]=useStudent()
    const location=useLocation()
    
    if( isStudentLoading){
        return <div className="min-h-screen max-w-full flex justify-center items-center">
            <span className="loading loading-spinner text-secondary"></span>
        </div>
    }
    
    if(user && isStudent){
        return children
    }
    return <Navigate to={'/'} state={{from:location}} replace></Navigate>
    
};

export default StudentRoute;