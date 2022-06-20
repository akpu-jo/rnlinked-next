import { useSession } from "next-auth/react";
import Welcome from "pages/welcome";
import React from "react";

const WithSession = ({ children }) => {
  const { data: session } = useSession();

  if (session) {
    return <>{children}</>;
  }

  return (
    <>
      <Welcome />
    </>
  );
};

export default WithSession;
