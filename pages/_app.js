import { NextUIProvider } from "@nextui-org/react";

import "../styles/globals.css";
import SocketLayout from "@/components/navs/SocketLayout";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

function MyApp({ Component, pageProps: {  ...pageProps } }) {
  useEffect(() => {
    import("preline");
  }, []);


  return (
    <AuthProvider>
          <NextUIProvider>
            <SocketLayout>
              <Component {...pageProps} />
            </SocketLayout>
          </NextUIProvider>
    </AuthProvider>
  );
}

export default MyApp;
