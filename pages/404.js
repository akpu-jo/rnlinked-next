import { useRouter } from "next/router";
import React from "react";
import EmptyStates from "../components/uiTemplates/EmptyStates";

const Error404 = () => {
  const router = useRouter();

  return (
    <div className=" h-screen">
      <EmptyStates
        illustration={"/404.svg"}
        heading={"Something's missing"}
        message={"That cannula might have tissued! lets try the home page."}
        btnText={"Home page"}
        action={() => router.push("/")}
      />
    </div>
  );
};

export default Error404;
