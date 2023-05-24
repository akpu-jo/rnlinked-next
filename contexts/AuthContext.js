import LoadingState from "@/components/uiTemplates/LoadingState";
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
  const [inAuthFlow, setInAuthFlow] = useState(false);

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

  const findAndSetUser = async (session) => {
    const { data } = await axios.get(`/api/users?uid=${session.uid}`);
    const { user } = data;

    if (
      user.inEmailList === undefined &&
      user.receivedEmailPrompt === undefined
    ) {
      showPersonalExperience(true);
      return;
    } else if (!session.emailVerified && user.receivedEmailPrompt) {
      loadVerifyEmail(true);
    } else {
      setCookie("token", await session.getIdToken(true));

      setUser(user);
    }
    setVisible(false);
  };

  useEffect(() => {
    console.log(inAuthFlow);
    if (inAuthFlow) return;
    const unsubscribe = onAuthStateChanged(auth, async (session) => {
      console.log(inAuthFlow);
      if (session) {
        await findAndSetUser(session);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [inAuthFlow]);

  useEffect(() => {
    const handleTokenRefresh = setInterval(async () => {
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
    setInAuthFlow(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
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
    setInAuthFlow(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then(async (session) => {
        await findAndSetUser(session.user);
        router.push("/");
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
    setInAuthFlow(true);
    setLoading(true);
    setVisible(false)

    return signInWithPopup(auth, provider)
      .then(async (session) => {
        const isNewUser = session._tokenResponse.isNewUser;
        if (!isNewUser) {
          await findAndSetUser(session.user);
          router.push("/");
        } else {
          setLoading(false)
          showPersonalExperience(true);

          const user = {
            name: session.user.displayName,
            email: session.user.email,
            uid: session.user.uid,
            image: session.user.photoURL,
            signinMethod: session.providerId,
            emailVerified: session.user.emailVerified,
          };
          const { data } = await axios.post(`/api/users`, user);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const signout = async () => {
    await signOut(auth);
    setUser(null);
    deleteCookie("token");
    router.push("/");
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
      {loading ? <LoadingState /> : children}
    </AuthContext.Provider>
  );
};
