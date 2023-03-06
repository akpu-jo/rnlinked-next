import { useAuth } from "@/contexts/AuthContext";
import { Loading } from "@nextui-org/react";
import { auth } from "firebaseConfig";
import React, { useEffect } from "react";
import { setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

const Refresh = () => {
  const router = useRouter();

  const forceRefreshToken = async () => {
    try {
      const token = await auth.currentUser.getIdToken(true);
      console.log("refreshing token from /refresh...");
      deleteCookie("token");
      setCookie("token", token);
      const decodedPath = window.decodeURIComponent(router.query.redirect);
        router.replace(decodedPath)
    } catch (error) {
      router.replace("/");
    }
  };
  useEffect(() => {
    forceRefreshToken();
  }, []);

  return (
    <div className=" h-screen flex justify-center items-center text-elm-300">
      <Loading color='currentColor' size="xl" />
    </div>
  );
};

export default Refresh;
