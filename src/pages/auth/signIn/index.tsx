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
// }
// export async function getServerSideProps(context: any) {
//   const { req } = context;
//   const cookies = parseCookies({ req });

//   if (cookies?.olytoken) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       token: cookies?.olytoken || "",
//     },
//   };
}
