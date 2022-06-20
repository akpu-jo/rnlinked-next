import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";

import "../styles/globals.css";
import SocketLayout from "@/components/navs/SocketLayout";
import WithSession from "@/components/uiTemplates/WithSession";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <WithSession>
          <SocketLayout>
            <Component {...pageProps} />
          </SocketLayout>
        </WithSession>
      </NextUIProvider>
    </SessionProvider>
  );
}

export default MyApp;
