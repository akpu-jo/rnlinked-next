import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { createContext, useContext, useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAsrDblrH558aloxHQ7yKksmJtVenQRbgU",
  authDomain: "rnlinked-b7321.firebaseapp.com",
  projectId: "rnlinked-b7321",
  storageBucket: "rnlinked-b7321.appspot.com",
  messagingSenderId: "719823973560",
  appId: "1:719823973560:web:e7da27942fec6b2172184d",
  measurementId: "G-RDERS51X7W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const session = useAuthProvider();
  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

function useAuthProvider () {
  const [user, setUser] = useState(null);

  const login =  (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        setUser(userCredential.user)
        console.log(userCredential);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}: ${errorMessage}`)
      });
    // const userCredential =  signInWithEmailAndPassword(
    //   auth,
    //   email,
    //   password
    // );
    // setUser(userCredential.user);
    return userCredential
  };


  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    setUser(userCredential.user);
    console.log(userCredential);
  };

  const signout = async (email, password) => {
    await signOut(auth);
    setUser(null);
  };

  const sendPasswordResetEmail = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const confirmPasswordReset = (password, code) => {};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    login,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};

