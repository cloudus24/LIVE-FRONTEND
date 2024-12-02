import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./signInForm.module.scss";
import { Button, Col, Container, Row } from "react-bootstrap";
import SignInImage from "@/assets/images/sign-removebg-preview.png";
import eyeSlash from "@/assets/images/eyeSlashOpen.png";
import eyeSlashClose from "@/assets/images/eye-slash.png";
import nookies from "nookies";
import Image from "next/image";
import Form from "react-bootstrap/Form";
import Link from "next/link";

import Spinner from "@/components/modules/spinner";
import { setItemInSession } from "@/utils/useHooks/useStorage";
import { handleUserLogin, UserLoginResponse } from "@/utils/api";
import {
    toastError,
    toastSuccess,
  } from "@/utils";

const SignInForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const res = await handleUserLogin({ body: formData });

            if (res.isError) {
                toastError(res.response as string);
            } else {
                const message = (res.response as UserLoginResponse).message;
                const userData = (res.response as UserLoginResponse).data;
                const auth_token = (res.response as UserLoginResponse).auth_token;

                if (userData && auth_token) {
                    console.log('message :>> ', message);
                    toastSuccess(message);
                    setItemInSession("userData", userData);
                    console.log("userData :>> ", userData);
                    nookies.set(null, "auth_token", auth_token, {
                        path: "/",
                        maxAge: 7 * 24 * 60 * 60,
                    });

                    router.push("/");
                } else {
                    toastError("Unexpected response from the server.");
                }
            }
        } catch (error) {
            toastError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <div className={styles.mainSection}>
                <Container>
                    <Row className={styles.signInCenter}>
                        <Col className={styles.signInImageSection}>
                            <div className={styles.signInImage}>
                                <Image src={SignInImage} alt="Sign In" />
                            </div>
                        </Col>
                        <Col className={styles.signInForm}>
                            <div className={styles.signInTitle}>
                                <h1 >Sign In</h1>
                            </div>

                            <Form onSubmit={handleSubmit}>
                                <Form.Control
                                    placeholder="Email Address"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    required
                                    onChange={handleOnChange}
                                    autoComplete="email"
                                    aria-label="Email Address"
                                />
                                <div className={styles.SignUpPasswordSection}>
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleOnChange}
                                        required
                                        autoComplete="current-password"
                                        aria-label="Password"
                                    />
                                    <div className={styles.passwordEyeSection}>
                                        <Image
                                            src={showPassword ? eyeSlashClose : eyeSlash}
                                            alt={showPassword ? "Hide Password" : "Show Password"}
                                            onClick={togglePasswordVisibility}
                                            width={24}
                                            height={24}
                                            style={{ cursor: "pointer" }}
                                        />
                                    </div>
                                </div>
                                <div className={styles.passwordForgotSection}>
                                    <Link href="/auth/forgot-password">
                                        <label>Forgot Password?</label>
                                    </Link>
                                </div>
                                {error && <p className={styles.errorMessage}>{error}</p>}
                                {successMessage && (
                                    <p className={styles.successMessage}>{successMessage}</p>
                                )}
                                <div className={styles.signUpBtnSection}>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? <Spinner /> : "Sign In"}
                                    </Button>
                                </div>

                                <div className={styles.signAccountSection}>
                                    Don’t have an account ?{" "}
                                    <Link href="/auth/signup">
                                        <span> Sign Up</span>
                                    </Link>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default SignInForm;
