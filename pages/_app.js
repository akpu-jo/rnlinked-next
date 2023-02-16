import { NextUIProvider } from "@nextui-org/react";

import "../styles/globals.css";
import SocketLayout from "@/layouts/SocketLayout";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  useEffect(() => {
    import("preline");
  }, []);

  return (
    <AuthProvider>
      <NextUIProvider>
        <SocketLayout>
            {getLayout(<Component {...pageProps} />)}
        </SocketLayout>
      </NextUIProvider>
    </AuthProvider>
  );
}

export default MyApp;
