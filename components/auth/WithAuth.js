import { useModal } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AuthOptions from "./AuthOptions";

const WithAuth = (Component) => {
  const NewComponent = (props) => {
    const { setVisible, bindings } = useModal();
    const [isSignup, setIsSignup] = useState(false);

    const [closeMethod, setCloseMethod] = useState(null);

    return (
      <>
        <Component setVisible={setVisible} setCloseMethod={setCloseMethod} {...props} />
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
