import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const SocialSignIn = ({currentLocation}) => {
    const {user, googleSignIn}=useContext(AuthContext)
    // console.log(user);
    const navigate=useNavigate()
    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            addUser(user)
            navigate(currentLocation,{replace:true})
          }).catch((error) => {
            // Handle Errors here.
            console.log(error);
          });

    }
    const addUser=(user)=>{
        const newData={name:user.displayName,image:user.photoURL,email:user.email,role:"student"}
        fetch("https://sports-academies-server-five.vercel.app/user",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(newData)
        })
        .then(res=>res.json())
        .then(data=>{
           
        })
    }
    return (
        <>
        <p>or social sign in</p>
        <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline mt-3">
            <FaGoogle />
        </button>
        </>
    );
};

export default SocialSignIn;