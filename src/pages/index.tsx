import { useRouter } from "next/router";
import SingInCompoent from "@/components/rendering/auth/signInForm";

const HomePage = () => {
    const router = useRouter();

    return (
        <>
            <SingInCompoent />
        </>
    );
};

export default HomePage;
