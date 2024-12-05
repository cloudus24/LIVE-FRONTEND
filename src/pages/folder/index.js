import { getCookie, removeCookie } from "@/utils/useHooks/useCookies";
import {
  getItemFromLocal,
  removeItemFromLocal,
  removeItemFromSession,
} from "@/utils/useHooks/useStorage";
import { useRouter } from "next/router";

const NePpage = () => {
  const router = useRouter();

  const handleLogout = () => {
    const latestUserData = getItemFromLocal("user_data");

    removeCookie("auth_token");
    removeItemFromLocal("user_data");
    removeItemFromSession("userData");

    router.push("/");
  };

  return (
    <div>
      <h1>Folder</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default NePpage;
