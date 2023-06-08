import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../providers/AuthProvider';

const SocialSignIn = () => {
    const {user, googleSignIn}=useContext(AuthContext)
    console.log(user);
    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
           console.log(user);
          }).catch((error) => {
            // Handle Errors here.
            console.log(error);
          });

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