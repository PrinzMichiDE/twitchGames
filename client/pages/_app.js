import { SessionProvider } from "next-auth/react";
import '../styles/globals.css'; // If you have an
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
