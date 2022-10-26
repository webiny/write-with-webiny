import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Wrapper } from "../lib/appState";
import Topbar from "../components/Topbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
      <Topbar />
      <Component {...pageProps} />
    </Wrapper>
  );
}

export default MyApp;
