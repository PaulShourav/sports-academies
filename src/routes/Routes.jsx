
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import SignInAndUp from '../pages/SignInAndUp/SignInAndUp';
import Screate from '../pages/Screate';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../layouts/Dashboard';
import AllUser from '../pages/Dashboard/AllUser/AllUser';
import AddClass from '../pages/Dashboard/AddClass/AddClass';
import AdminRoute from './AdminRoute';

const router=createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'screate',
                element:<PrivateRoute><Screate/></PrivateRoute>
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
                path:"addClass",
                element:<AddClass/>
            }
        ]
    }
])
export default router;