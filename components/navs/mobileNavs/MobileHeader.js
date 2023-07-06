import NotificationIcon from "@/components/icons/NotificationIcon";
import UserOptionsDropdown from "@/components/users/UserOptionsDropdown";
import { useAuth } from "@/contexts/AuthContext";
import { Tooltip } from "@nextui-org/react";
import React from "react";

const MobileHeader = () => {
  const { user } = useAuth();

  return (
    <header className=" sm:hidden p-3 mb-3">
      <nav className=" flex justify-between items-center">
        <h1 className=" font-head font-semibold text-3xl lowercase tracking-tight">
          RNLinked.
        </h1>
        <section className=" flex justify-start items-center gap-5 ">
          <Tooltip content={"Coming soon"} trigger="click" placement="bottom">
            <NotificationIcon />
          </Tooltip>
          {user && <UserOptionsDropdown />}
        </section>
      </nav>
    </header>
  );
};

export default MobileHeader;
