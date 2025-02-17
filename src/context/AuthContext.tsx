import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { app } from "../firebase";

interface IAuthProps {
    children: ReactNode,
}

export const AuthContext = createContext({
    // User: firebase에서 제공하는 타입
    user: null as User | null
})

const AuthContextProvider = ({children} : IAuthProps) => {
    const auth = getAuth(app);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(()=> {
        onAuthStateChanged(auth, (user)=> {
            if(user){
                setCurrentUser(user)
            } else {
                setCurrentUser(user)
            }
        })
    },[auth])

    return (
        <AuthContext.Provider value={{user : currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;