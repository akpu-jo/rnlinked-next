import EmailSent from "@/components/auth/password/EmailSent";
import RecButton from "@/components/uiTemplates/buttons/RecButton";
import { useAuth } from "@/contexts/AuthContext";
import { updateUser } from "@/utils/client/users";
import { Loading } from "@nextui-org/react";
import axios from "axios";
import { applyActionCode, checkActionCode } from "firebase/auth";
import { auth } from "firebaseConfig";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Action = () => {
  const router = useRouter();
  const { addUserToSib, setUser } = useAuth();
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      setVerifying(true);
      if (!router.query.mode) return;

      const actionCodeInfo = await checkActionCode(auth, router.query.oobCode);
      applyActionCode(auth, router.query.oobCode)
        .then(async () => {
          console.log("verified", actionCodeInfo);

          const email = actionCodeInfo.data.email;
          const meta = {
            filter: { email },
            reqBody: { emailVerified: true },
          };
          const { data } = await axios.patch("/api/users", meta);
          console.log(data.user);
          await addUserToSib(meta.filter);
          setUser(data.user);
          router.push("/");
          setVerifying(false);
        })
        .catch((error) => {
          setVerifying(false);
          setError(true);
          console.log(error);
        });
    };

    verifyUser();
  }, [router.query]);

  const pushToLogin = () => {
    router.push("/");
  };

  return (
    <div className=" flex items-center justify-center flex-col max-w-md mx-auto">
      <div className=" p-3 mb-20 ">
        <Image
          src="/rn-logo.png"
          alt="Picture of the logo"
          width={125}
          height={28}
        />
      </div>
      {!verifying ? (
        <>
          {" "}
          {error && (
            <div className=" ring-1 ring-slate-100 p-10 text-center shadow-2xl ">
              <h2 className=" tracking-wide text-2xl font-medium py-2">
                Something went wrong
              </h2>
              <p className=" tracking-normal py-2 ">
                We are having trouble verifying your email{" "}
              </p>
              <span>
                <Link
                  className="underline visited:text-burntSienna-400"
                  href={"mailto:support@rnlinked.com"}
                >
                  Contact us
                </Link>
              </span>{" "}
              <RecButton
                text={"Go to login"}
                bg={"bg-elm-900 font-semibold mt-12"}
                color={"text-slate-50"}
                action={pushToLogin}
              />
            </div>
          )}
        </>
      ) : (
        <Loading color="currentColor" size="xl" />
      )}
    </div>
  );
};

export default Action;
