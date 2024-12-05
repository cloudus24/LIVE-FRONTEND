import { getCookie, removeCookie } from "@/utils/useHooks/useCookies";
import {
    getItemFromLocal,
    removeItemFromLocal,
    removeItemFromSession,
  } from "@/utils/useHooks/useStorage";
const handlelogout = () => {
    let letetsuserData = getItemFromLocal("user_data");
    removeCookie("auth_token");
    removeItemFromLocal("user_data");
    removeItemFromSession("userData");
}




const nePpage = () => {
    return (
        <div>
            <h1>Folder</h1>
            <button onClick={handlelogout}>button</button>
        </div>
    )
}

export default nePpage