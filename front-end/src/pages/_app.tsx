import Layout from "../components/layout/Layout";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Layout route={router.pathname}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
