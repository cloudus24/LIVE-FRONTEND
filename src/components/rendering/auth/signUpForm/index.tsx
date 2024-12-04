import React, { useState } from "react";
import styles from "./signupForm.module.scss";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import Image from "next/image";
import SignInImage from "@/assets/images/sign-removebg-preview.png";
import eyeSlash from "@/assets/images/eyeSlashOpen.png";
import eyeSlashClose from "@/assets/images/eye-slash.png";
import { signupNewUser } from "@/utils/api";
import Spinner from "@/components/modules/spinner";
import { toastSuccess, toastError } from "@/utils";
import { useRouter } from "next/router";

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
    let sanitizedValue = value.replace(emojiRegex, "").trimStart();

    const finalValue =
      name === "password" || name === "confirm_password"
        ? sanitizedValue.replace(/\s/g, "")
        : sanitizedValue;

    setFormData({
      ...formData,
      [name]: finalValue,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const { userName, email, password, confirm_password } = formData;
  
    if (!userName || !email || !password || !confirm_password) {
      toastError("All fields are required.");
      return;
    }
  
    if (password !== confirm_password) {
      toastError("Passwords do not match.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await signupNewUser({
        body: { userName, email, password },
      });
  
      if (!response.isError) {
        if (typeof response.response === "object" && response.response !== null) {
          const { message, data } = response.response;

          console.log('object :>> ', message, data );
  
          toastSuccess(message);
          if (typeof data === "string") {
            localStorage.setItem("email", data); 
            console.log('data=========================>', data)
            router.push(`/auth/otpVerification?email=${data}`);
          } else {
            toastError("Email not found in the response data.");
          }
        } else {
          toastError("Unexpected response format.");
        }
      } else {
        toastError(response.response as string);
      }
    } catch (error) {
      toastError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
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
              <h1>Sign Up</h1>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="User Name"
                  name="userName"
                  value={formData.userName}
                  onChange={handleOnChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  required
                  autoComplete="email"
                />
              </Form.Group>
              <div className={styles.SignUpPasswordSection}>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  required
                  autoComplete="new-password"
                />
                <div className={styles.passwordEyeSection}>
                  <img
                    src={showPassword ? eyeSlashClose.src : eyeSlash.src}
                    alt={showPassword ? "Hide Password" : "Show Password"}
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <div className={styles.SignUpPasswordSection}>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleOnChange}
                  required
                />
                <div className={styles.passwordEyeSection}>
                  <img
                    src={showConfirmPassword ? eyeSlashClose.src : eyeSlash.src}
                    alt={showConfirmPassword ? "Hide Password" : "Show Password"}
                    onClick={toggleConfirmPasswordVisibility}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <div className={styles.signUpBtnSection}>
                <Button type="submit" disabled={loading}>
                  {loading ? <Spinner /> : "Sign Up"}
                </Button>
              </div>
              <div className={styles.signAccountSection}>
                Already registered?
                <Link href="/auth/signIn">
                  <span> Sign In</span>
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupForm;
