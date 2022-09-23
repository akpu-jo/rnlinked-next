import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";

import "../styles/globals.css";
import SocketLayout from "@/components/navs/SocketLayout";
import WithSession from "@/components/uiTemplates/WithSession";
import { useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  
  useEffect(() => {
    import("preline");
  }, []);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={session}>
      {getLayout(
        <NextUIProvider>
          <SocketLayout>
            <Component {...pageProps} />
          </SocketLayout>
        </NextUIProvider>
      )}
    </SessionProvider>
  );
}

export default MyApp;
