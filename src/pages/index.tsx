import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const SignInComponent = dynamic(() => import('../components/rendering/auth/signInForm'), { ssr: false })


const HomePage = () => {
  const router = useRouter();

  return (
    <div>
      <SignInComponent />
    </div>
  );
};

export default HomePage;
