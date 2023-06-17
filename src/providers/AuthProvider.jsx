import { createContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext=createContext(null)
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user,setUser]=useState()
    const [isLoading,setIsLoading]=useState(true)
    const createAccount=(email,password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const emailPasswordSignin=(email,password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleSignIn=()=>{
        return signInWithPopup(auth, googleProvider)
    }
    const logOut=()=>{
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setIsLoading(false)
        });
        return ()=>{
            return unsubscribe()
        }
    },[])
    
   const users={
        user,
        isLoading,
        emailPasswordSignin,
        googleSignIn,
        logOut,
        createAccount
    }
    return (
        <AuthContext.Provider value={users}>
            {children} 
        </AuthContext.Provider>
    );
};

export default AuthProvider;