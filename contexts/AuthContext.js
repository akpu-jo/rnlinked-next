import { useModal } from "@nextui-org/react";
import axios from "axios";
import { setCookie, deleteCookie } from "cookies-next";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "firebaseConfig";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const { setVisible, bindings } = useModal();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [isSignup, setIsSignup] = useState(false);
  const [signinForm, setSigninForm] = useState(false);
  const [signupForm, setSignupForm] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [showEmailOptIn, setShowEmailOptIn] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [inSignUpFlow, setInSignUpFlow] = useState(false);

  //via catch up
  const [openCatchUp, setOpenCatchUp] = useState(false);
  const [personalExpCatchUp, setPersonalExpCatchUp] = useState(false);
  const [emailVerificationCatchUp, setEmailVerificationCatchUp] =
    useState(false);

  const errorCodes = [
    "auth/wrong-password",
    "auth/user-not-found",
    "auth/email-already-in-use",
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (session) => {
      if (inSignUpFlow) return;
      console.log("from unsubscribe", session);
      if (session) {
        const { data } = await axios.get(`/api/users?email=${session.email}`);
        
        const { user } = data;
        console.log("from unsubscribe", user);
        if (!user.inEmailList && !user.receivedEmailPrompt) {
          showPersonalExperience(true);
          return;
        }

        if (!session.emailVerified && user.receivedEmailPrompt) {
          loadVerifyEmail(true);
        }
        setCookie("token", await session.getIdToken(true));

        setUser(user);
        setVisible(false)
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
    setInSignUpFlow(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log(userCredential);
        const image =
          "https://res.cloudinary.com/rnlinked/image/upload/v1679134371/avatar-default_wvnv69.webp";

        const { data } = await axios.post(`/api/users`, {
          name,
          uid: userCredential.user.uid,
          email,
          image,
          signinMethod: "email",
          emailVerified: userCredential.user.emailVerified,
        });
        setCookie("token", userCredential.user.accessToken);
        showPersonalExperience();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        errorCodes.includes("auth/email-already-in-use")
          ? setError("Email already taken, please sign in instead.")
          : setError("Problems creating your account, please try again");
        console.log(`${errorCode}: ${errorMessage} testing first`);
        console.log(error);
      });
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

  const showPersonalExperience = (viaCatchUp = false) => {
    if (viaCatchUp) {
      setOpenCatchUp(true);
      setEmailVerificationCatchUp(false);
      setPersonalExpCatchUp(true);
    } else {
      setShowOptions(false);
      setSigninForm(false);
      setSignupForm(false);
      setShowEmailOptIn(true);
    }
  };
  const loadVerifyEmail = (viaCatchUp = false) => {
    if (viaCatchUp) {
      setOpenCatchUp(true);
      setPersonalExpCatchUp(false);
      setEmailVerificationCatchUp(true);
    } else {
      setShowOptions(false);
      setSigninForm(false);
      setSignupForm(false);
      setShowEmailOptIn(false);
      setShowVerifyEmail(true);
    }
  };

  const withProvider = (provider) => {
    return signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result);
        const isNewUser = result._tokenResponse.isNewUser;
        const user = {
          name: result.user.displayName,
          email: result.user.email,
          uid: result.user.uid,
          image: result.user.photoURL,
          signinMethod: result.providerId,
          emailVerified: result.user.emailVerified,
        };
        console.log(user);
        if (isNewUser) {
          setInSignUpFlow(true);
          const { data } = await axios.post(`/api/users`, user);
          showPersonalExperience();
          console.log(data);
          //add personal experience togle to context-done
          //update user record in MongoDB-done
          //create a function to handle personal experience onSubmit
          //if user agrees - add to sendinBlue
          //setUser to new user record from mongo
          // setUser(data.user);
        }
      })
      .catch((error) => console.log(error));
  };

  const signout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/");
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error));
  };

  const addUserToSib = async (filter) => {
    const { data } = await axios.post("/api/users/sib/create-contact", {
      filter,
    });
    return data;
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        setError,
        signup,
        signin,
        withProvider,
        signout,
        verifyEmail,
        addUserToSib,
        showEmailOptIn,
        setShowEmailOptIn,
        signinForm,
        setSigninForm,
        signupForm,
        setSignupForm,
        showOptions,
        setShowOptions,
        showVerifyEmail,
        setShowVerifyEmail,
        loadVerifyEmail,
        setVisible,
        bindings,
        isSignup,
        setIsSignup,
        openCatchUp,
        setOpenCatchUp,
        personalExpCatchUp,
        setPersonalExpCatchUp,
        emailVerificationCatchUp,
        setEmailVerificationCatchUp,
      }}
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
