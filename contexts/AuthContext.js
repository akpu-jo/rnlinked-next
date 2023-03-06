import axios from "axios";
import { setCookie, deleteCookie } from "cookies-next";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "firebaseConfig";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const errorCodes = ["auth/wrong-password", "auth/user-not-found"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (session) => {
      if (session) {
        const { data } = await axios.get(`/api/users?email=${session.email}`);
        setCookie("token", await session.getIdToken(true));

        setUser(data.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleTokenRefresh = setInterval(async () => {
      console.log("refreshing token...");
      if (user) {
        const token = await auth.currentUser.getIdToken(true);
        console.log("refreshing token...");
        deleteCookie("token");
        setCookie("token", token);
      }
    }, 30 * 60 * 1000);

    return () => {
      clearInterval(handleTokenRefresh);
    };
  }, []);

  const signup = async (email, password, name) => {
    try {
      createUserWithEmailAndPassword(auth, email, password).then(
        async (userCredential) => {
          const { data } = await axios.post(`/api/users`, {
            name,
            uid: userCredential.user.uid,
            email,
            image: "",
          });
          setUser(data.user);
          console.log(data.user);
          console.log(userCredential.user);
        }
      );
    } catch (error) {
      console.log(error);
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
        errorCodes.includes(errorCode) &&
          setError("Please provide a valid email address and password.");
        console.log(`${errorCode}: ${errorMessage} testing first`);
      });
  };

  const withProvider = (provider) => {
    return signInWithPopup(auth, provider)
      .then(async (result) => {
        const isNewUser = result._tokenResponse.isNewUser;
        const user = {
          name: result.user.displayName,
          email: result.user.email,
          uid: result.user.uid,
          image: result.user.photoURL,
        };
        if (isNewUser) {
          const { data } = await axios.post(`/api/users`, user);
          setUser(data.user);
        }
      })
      .catch((error) => console.log(error));
  };

  const signout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, error, setError, signup, signin, withProvider, signout }}
    >
      {loading ? null : children}
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
