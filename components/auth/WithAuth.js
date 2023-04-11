import { useAuth } from "@/contexts/AuthContext";
import React, { useState } from "react";
import AuthOptions from "./AuthOptions";

const WithAuth = (Component) => {
  const NewComponent = (props) => {
    const { setVisible, bindings, isSignup, setIsSignup } = useAuth();

    const [closeMethod, setCloseMethod] = useState(null);

    return (
      <>
        <Component
          setVisible={setVisible}
          setCloseMethod={setCloseMethod}
          {...props}
        />
        <AuthOptions
          onclose={closeMethod}
          setVisible={setVisible}
          bindings={bindings}
          isSignup={isSignup}
          setIsSignup={setIsSignup}
        />
      </>
    );
  };

  return NewComponent;
};

export default WithAuth;
