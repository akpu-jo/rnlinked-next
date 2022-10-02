import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth'

import { createContext, useContext, useEffect, useState} from 'react'

const firebaseConfig = {
    apiKey: "AIzaSyAsrDblrH558aloxHQ7yKksmJtVenQRbgU",
    authDomain: "rnlinked-b7321.firebaseapp.com",
    projectId: "rnlinked-b7321",
    storageBucket: "rnlinked-b7321.appspot.com",
    messagingSenderId: "719823973560",
    appId: "1:719823973560:web:e7da27942fec6b2172184d",
    measurementId: "G-RDERS51X7W"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const session = useAuthProvider()
    return (
        <AuthContext.Provider value={{session }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

const useAuthProvider = () => {
    const [user, setUser] = useState(null)

    const signin = (email, password) => {
        
    }

    const signup = (email, password) => {

    }

    const signout = (email, password) => {

    }
    const sendPasswordResetEmail = (email) => {

    }
    const confirmPasswordReset = (password, code) => {

    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if(user){
                setUser(user)
            } else {
                setUser(null)
            }
        })

        return () => unsubscribe()
    }, [])
    
    return{ 
        signin,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset,
    }
}

export {AuthContext}