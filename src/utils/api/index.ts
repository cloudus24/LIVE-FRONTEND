import { BACKEND_KEY } from "../constants";

export interface UserLoginResponse {
    status: boolean;
    error?: string;
    message?: string;
    auth_token?: string;
    data?: {
        [key: string]: any;
    };
}

export interface ErrorResponse {   
    error: string;
}

export async function handleUserLogin({
    body
}: {
    body: { email: string; password: string }; 
}) {
    const url = `${process.env.NEXT_PUBLIC_API_BASEURL}user/login`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "key": `${BACKEND_KEY}`,
            },
            body: JSON.stringify(body),
        });

        const res: UserLoginResponse = await response.json();

        if (response.status === 200 && res.status) {
            return {
                isError: false,
                response: res,
            };
        }

        return {
            isError: true,
            response: res.error || "An error occurred",
        };

    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                isError: true,
                response: error.message || "An unexpected error occurred",
            };
        } else {

            return {
                isError: true,
                response: "An unexpected error occurred",
            };
        }
    }
}


const authApiSingIn = async (query: string, config: any) =>
  await (await fetch(`/api/auth/signin?${query}`, config)).json();