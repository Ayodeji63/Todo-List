import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged, 
    GoogleAuthProvider, 
    signInWithPopup,  
    signOut} from "firebase/auth";

import { auth } from "../firebaseConfig";

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const provider = new GoogleAuthProvider();
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signWithGoogle = async () => {
        return await signInWithPopup(auth, provider)
    }
    


    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser)
        });
        return () => {
            unsubscribe()
        }
    }, [])

    const [data, setData] = useState({
        email: "",
        password: "",
        fullname: "",
      });
    return (
        <UserContext.Provider value={{createUser, user, logout, signIn, signWithGoogle, data, setData}}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(UserContext)
}