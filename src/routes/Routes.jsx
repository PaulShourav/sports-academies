
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import SignInAndUp from '../pages/SignInAndUp/SignInAndUp';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../layouts/Dashboard';
import AllUser from '../pages/Dashboard/AllUser/AllUser';
import AddClass from '../pages/Dashboard/AddClass/AddClass';
import AdminRoute from './AdminRoute';
import InstructorRoute from './InstructorRoute';
import MyClasses from '../pages/Dashboard/MyClasses.jsx/MyClasses';
import AllClasses from '../pages/Dashboard/AllClasses/AllClasses';
import Classes from '../pages/Classes/Classes';
import SelectedClass from '../pages/Dashboard/Student/SelectedClass/SelectedClass';
import Instructor from '../pages/Instructor/Instructor';
import Error from '../pages/Error/Error';
import EnrolledClasses from '../pages/Dashboard/Student/EnrolledClasses/EnrolledClasses';

const router=createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        errorElement:<Error/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'classes',
                element:<Classes/>
            },
            {
                path:'instructor',
                element:<Instructor/>
            },
            {
                path:'signIn&Up',
                element:<SignInAndUp/>
            }
        ]
    },
    {
        path:"dashboard",
        element:<PrivateRoute><Dashboard/></PrivateRoute>,
        children:[
            {
                path:"allUser",
                element:<AdminRoute><AllUser/></AdminRoute>
            },
            {
                path:"allClasses",
                element:<AdminRoute><AllClasses/></AdminRoute>
            },
            {
                path:"addClass",
                element:<InstructorRoute><AddClass/></InstructorRoute>
            },
            {
                path:"myClasses",
                element:<InstructorRoute><MyClasses/></InstructorRoute>
            },
            {
                path:"selectedClass",
                element:<SelectedClass/>
            },
            {
                path:"enrolledClass",
                element:<EnrolledClasses/>
            }
        ]
    }
])
export default router;