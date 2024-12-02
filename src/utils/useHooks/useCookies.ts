import nookies from "nookies";

// Get item from cookies
export const getCookie = (key: string) => {
  const cookies = nookies.get();
  const cookieValue = cookies[key];
  return cookieValue;
};

// Remove item from  cookies
export const removeCookie = (key: string) => {
  nookies.destroy(null, key, { path: "/" });
};
