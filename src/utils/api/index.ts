import { BACKEND_KEY } from "../constants";


export interface AuthTokenResponse {
    auth_token: string;
  }
  
  export interface ApiResponse<T = any> {
    status: boolean;
    message: string;
    data?: T;
    auth_token?: string;
  }
  

// Helper function for making API calls
async function apiCall<T = any>(url: string, body: Record<string, any>) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "key": `${BACKEND_KEY}`,
            },
            body: JSON.stringify(body),
        });

        const res: ApiResponse<T> = await response.json();

        if (response.ok && res.status) {
            return {
                isError: false,
                response: res,
            };
        }

        return {
            isError: true,
            response: res.message || "An error occurred",
        };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        return {
            isError: true,
            response: errorMessage,
        };
    }
}

// User Login
export async function handleUserLogin({ body }: { body: { email: string; password: string } }) {
    const url = `${process.env.NEXT_PUBLIC_API_BASEURL}user/login`;
    return await apiCall<ApiResponse<AuthTokenResponse>>(url, body)
  }
  

// User Signup
export async function signupNewUser({ body }: { body: { email: string; password: string; userName: string } }) {
    const url = `${process.env.NEXT_PUBLIC_API_BASEURL}user/create`;
    return await apiCall<{ email: string }>(url, body);
}

// Verify OTP
export async function verifyOtp({ body }: { body: { email: any; otp: string } }) {
    const url = `${process.env.NEXT_PUBLIC_API_BASEURL}user/verifyOtp`;
    return await apiCall<ApiResponse<AuthTokenResponse>>(url, body);
}
