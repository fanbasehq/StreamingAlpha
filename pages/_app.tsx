import Head from "next/head";
import { MoralisProvider } from "react-moralis";
import "../styles.scss";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>

      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
        serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </>
  );
}
