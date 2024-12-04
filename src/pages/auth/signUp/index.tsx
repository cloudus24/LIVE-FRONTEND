import SingUpCompoent from "@/components/rendering/auth/signUpForm";
import Head from "next/head";
import { parseCookies } from "nookies";

export default function SingIn() {
  return (
    <>
      <main>
        <SingUpCompoent />
      </main>
    </>
  );
}
