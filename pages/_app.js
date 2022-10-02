import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";

import "../styles/globals.css";
import SocketLayout from "@/components/navs/SocketLayout";
import WithSession from "@/components/uiTemplates/WithSession";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    import("preline");
  }, []);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthProvider>
      <SessionProvider session={session}>
        {getLayout(
          <NextUIProvider>
            <SocketLayout>
              <Component {...pageProps} />
            </SocketLayout>
          </NextUIProvider>
        )}
      </SessionProvider>
    </AuthProvider>
  );
}

export default MyApp;
