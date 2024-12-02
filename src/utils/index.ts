import toast from "react-hot-toast";

import UAParser from "ua-parser-js";
// import { getItemFromLocal } from "@/utils/useHooks/useStorage";
import CryptoJS from "crypto-js";

export const slugify = (str: string) =>
  str
    ?.toLowerCase()
    ?.trim()
    ?.replace(/[^\w\s-]/g, "")
    ?.replace(/[\s_-]+/g, "-")
    ?.replace(/^-+|-+$/g, "");

export const scrollToTop = () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.addEventListener("beforeunload", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

export const addClassToDocumentElement = (className: string) => {
  document.documentElement.classList.add(className);
};

export const removeClassToDocumentElement = (className: string) => {
  document.documentElement.classList.remove(className);
};

export const isMobileBrowser = (): boolean => {
  if (typeof window === "undefined") {
    return false; // or handle accordingly for server-side
  }
  const userAgent = navigator.userAgent || navigator.vendor;

  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return true;
  }

  return false;
};

export const isMobileAndroidBrowser = (): boolean => {
  if (typeof window === "undefined") {
    return false; // or handle accordingly for server-side
  }
  const userAgent = navigator.userAgent || navigator.vendor;

  // Check for common mobile devices' user agents
  if (/android/i.test(userAgent)) {
    return true;
  }

  if (/Opera Mini/i.test(userAgent)) {
    return true;
  }

  if (/IEMobile/i.test(userAgent) || /WPDesktop/i.test(userAgent)) {
    return true;
  }

  return false;
};

export const isDeviceLikelyToSupportESIM = (userAgent: string): boolean => {
  const parser = new UAParser(userAgent);
  const device = parser.getDevice();
  const os = parser.getOS();

  // Check if os.version is defined
  const osVersion = os.version ? os.version.split(".")[0] : "0";

  // Example logic to infer eSIM support
  // This is a basic check and may need refinement based on actual requirements
  const isSmartphone = device.type === "mobile";
  const isRecentOS =
    (os.name === "iOS" && parseInt(osVersion) >= 12) ||
    (os.name === "Android" && parseInt(osVersion) >= 9);

  return isSmartphone && isRecentOS;
};
export const handleOnCopy = (textToCopy: any) => {
  // Ensure the code runs only on the client side
  if (typeof window === "undefined" || !navigator?.clipboard) {
    console.error("Clipboard API is not available.");
    return;
  }

  if (textToCopy) {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toastSuccess("copied successfully!");
      })
      .catch((err) => {
        toastError("Failed to copy!");
      });
  }
};
export const toastError = (message: any) => {
  toast.error(message, {
    style: {
      borderRadius: "10px",
      color: "#000000",
      marginTop: "30px",
      border: "1px solid #DB4446",
      boxShadow: "0px 0px 4px 0px #DB444640",
    },
    position: "top-right",
  });
};

export const toastSuccess = (message: any) => {
  toast.success(message, {
    style: {
      borderRadius: "10px",
      color: "#000000",
      marginTop: "30px",
      border: "1px solid #40CD8A",
      boxShadow: "0px 0px 4px 0px #40CD8A40",
    },
    position: "top-right",
    // duration: 100000,
  });
};
export const requestForToken = async () => {
  try {
    // const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
    // if (currentToken) {
    //   return currentToken;
    // }
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
    return null;
  }
};
// const data = getItemFromLocal("userData");

// Function to reload Freshchat script
const reloadFreshchatScript = () => {
  const existingScript = document.querySelector(
    'script[src="//in.fw-cdn.com/31759201/903288.js"]'
  );
  if (existingScript) {
    existingScript.remove();
  }
  const script = document.createElement("script");
  script.src = "//in.fw-cdn.com/31759201/903288.js";
  script.dataset.chat = "true";
  script.onload = () => {};
  document.body.appendChild(script);
};

export const decryptText = (encryptedText: string): string => {
  const secretKey = CryptoJS.enc.Utf8.parse("ZvmDMH8MO11mpB86oM72InByy9QOaNFf");

  try {
    if (!encryptedText) {
      throw new Error("No ciphertext provided");
    }

    const ciphertext = CryptoJS.enc.Base64.parse(encryptedText);
    const key = secretKey;
    const iv = CryptoJS.lib.WordArray.create(16 as any);

    const decryptedBytes = CryptoJS.AES.decrypt(
      { ciphertext: ciphertext } as any,
      key,
      { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedText) {
      throw new Error(
        "Decryption failed, possibly due to incorrect key or corrupted data."
      );
    }

    return decryptedText;
  } catch (error: any) {
    return `Error decrypting: ${error?.message}`;
  }
};
