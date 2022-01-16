import { AppProps } from "next/app";
import Head from "next/head";
import { MoralisProvider } from "react-moralis";
import Auth from "../components/Auth";
import "../styles.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://video-react.github.io/assets/video-react.css"
        />
      </Head>

      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID!}
        serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL!}
      >
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </MoralisProvider>
    </>
  );
}
