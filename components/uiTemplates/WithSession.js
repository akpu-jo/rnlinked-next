import { useAuth } from "@/contexts/AuthContext";
import Welcome from "pages/welcome";
import React from "react";

const WithSession = ({ children }) => {
  const {user} = useAuth()

  if (user) {
    return <>{children}</>;
  }

  return (
    <>
      <Welcome />
    </>
  );
};

export default WithSession;
