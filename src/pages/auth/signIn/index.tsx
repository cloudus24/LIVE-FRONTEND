import SingInCompoent from "@/components/rendering/auth/signInForm";
import Head from "next/head";
import { parseCookies } from "nookies";

export default function SingIn() {
  return (
    <>
      <main>
        <SingInCompoent />
      </main>
    </>
  );
}
