import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronLeftIcon, UserCircleIcon } from "@heroicons/react/outline";
import UserOptionsDropdown from "@/components/users/UserOptionsDropdown";

export const APP_BAR_HEIGHT = "2rem";

const AppBar = ({ children, extraclass, alt = false, showUser = true }) => {
  const { user } = useAuth();

  const router = useRouter();
  return (
    <header
      className={`${extraclass} px-10 top-0 right-0 left-0 z-50 py-3 bg-slate-50 border-b`}
    >
      <nav
        className=" flex justify-between items-center max-w-6xl mx-auto space-x-  "
        style={{ height: APP_BAR_HEIGHT }}
      >
        <ul className="flex items-center ml-3">
          {alt ? (
            <button
              className=" text-slate-500 rounded-md p-2 bg-slate-100 mr-3 sm:hidden "
              onClick={(e) => {
                e.preventDefault();
                router.back();
              }}
            >
              <ChevronLeftIcon className=" w-5 h-5" />
            </button>
          ) : (
            <Link href="/" className={`${alt && "hidden sm:block"} flex items-center gap-4`}>
              <Image
                src="/icon-192x192.png"
                alt="rnlinked logo"
                width={50}
                height={50}
              />
              <h1 className=" hidden xl:block font-head font-semibold text-3xl lowercase tracking-tight">
                RNLinked.
              </h1>
            </Link>
          )}
        </ul>

        {children}
        {showUser && (
          <ul className="flex items-center z-20 mr-3">
            {user && <UserOptionsDropdown />}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default AppBar;
