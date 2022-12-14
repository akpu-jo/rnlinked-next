import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "firebaseConfig";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (session) => {
      if (session) {
        const {data} = await axios.get(`/api/users?email=${session.email}`);

         setUser(data.user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password, name) => {
    try {
      createUserWithEmailAndPassword(auth, email, password).then(
        async (userCredential) => {
          const { data } = await axios.post(`/api/users`, {
            name,
            uid: userCredential.user.uid,
            email
          });
          setUser(data.user);
          console.log(data.user);
          console.log(userCredential.user);
        }
      );
    } catch (error) {
      console.log(error)
    }

  };

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}: ${errorMessage}`);
      });
    // const userCredential =  signInWithEmailAndPassword(
    //   auth,
    //   email,
    //   password
    // );
    // setUser(userCredential.user);
    return userCredential;
  };

  const signout = async () => {
    await signOut(auth);
    setUser(null);
    router.push('/')
  };


  return (
    <AuthContext.Provider value={{ user, signup, signin, signout }}>
      { children}
    </AuthContext.Provider>
  );
};

// function useAuthProvider() {
//   const sendPasswordResetEmail = async (email) => {
//     await sendPasswordResetEmail(auth, email);
//   };

//   const confirmPasswordReset = (password, code) => {};

//   return {
//     login,
//     signup,
//     signout,
//     sendPasswordResetEmail,
//     confirmPasswordReset,
//   };
// }
