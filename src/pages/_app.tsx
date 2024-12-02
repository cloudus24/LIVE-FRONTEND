import "../assets/styles/global.css";
import "../assets/styles/main.scss";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  console.log("Rendering Component:", Component.name);
  console.log("Page Props:", pageProps);

  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
