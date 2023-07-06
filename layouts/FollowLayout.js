import ActiveLink from "@/components/navs/ActiveLink";
import MobileNav from "@/components/navs/MobileNav";
import SideNav from "@/components/navs/SideNav";
import { useRouter } from "next/router";
import React from "react";
import { useMediaQuery } from "react-responsive";
import AppBar from "./AppBar";
import Back from "@/components/navs/Back";

const FollowLayout = ({ children , ext}) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 640 });

  console.log(router)
  return (
    <div>
      <div className="max-w-6xl mx-auto sm:grid grid-cols-11 gap-5">
        <SideNav />
        <main className="col-span-8 bg-slate-00 pb-20 mx-auto w-full max-w-xl">
          <Back topic={`@${router.query.username}`} />
          <div
            className=" mt-6 mx-5 flex overflow-x-auto scrollbar-none"
            style={{ boxShadow: "inset 0 -2px 0 #edf2f7" }}
          >
            <ActiveLink
              href={`/${router.query.username}/followers`}
              replace={true}
              linkText={"Followers"}
            />
            <ActiveLink
              href={`/${router.query.username}/following`}
              replace={true}
              linkText={"Following"}
            />
          </div>
          <div>{ext}</div>
          {children}
        </main>
      </div>
      {/* <section className=" hidden lg:block sticky top-16  col-span-2 xl:col-span-2 bg-slate-40 mt-2 bg-hite rounded-xl p-5 max-h-96" /> */}

      <MobileNav />
    </div>
  );
};

export default FollowLayout;
