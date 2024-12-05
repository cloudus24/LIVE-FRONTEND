
import Image from "next/image";
import styles from "./otpVerification.module.scss";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import OTPInput from "@/components/modules/otpInput";
import { useRouter } from "next/router";
import { verifyOtp } from "@/utils/api";
import SignInImage from "@/assets/images/sign-removebg-preview.png";

import { toastError, toastSuccess } from "@/utils";
import nookies from "nookies";
import { setItemInSession } from "@/utils/useHooks/useStorage";

interface OtpVerificationProps {
  isOnlyVerify: boolean;
}

const OtpVerification = ({ isOnlyVerify }: OtpVerificationProps) => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [canResend, setCanResend] = useState(true);
  const [otpLoading, setOtpLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  const email = Array.isArray(router.query.email) ? router.query.email[0] : router.query.email;
  console.log('email======>', email);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        setCanResend(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleOnSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue || inputValue.length < 4) {
      toastError("Please enter a valid OTP.");
      return;
    }

    setLoading(true);


    try {
      const { isError, response } = await verifyOtp({ body: { email, otp: inputValue } });
      debugger
      if (typeof response === "string") {
        toastError(response);
        return;
      }

      const apiResponse = response;
      console.log('apiResponse :>> ', apiResponse);
      debugger;
      if (JSON.stringify(apiResponse.status)) {
        debugger;
        console.log("apiResponse?.status ", apiResponse);
        toastSuccess("OTP verified successfully!");

        nookies.set(null, "auth_token", JSON.stringify(apiResponse.auth_token), {
          path: "/",
          maxAge: 30 * 24 * 60 * 60,
        });

        if (apiResponse.data) {
          setItemInSession("userData",(apiResponse.data));
        }
        router.push("/folder");
      } else {
        const errorMessage = "Unknown error.";
        console.log("Error: " + errorMessage);
        toastError("An error occurred: " + errorMessage);
      }


    } catch (error) {
      toastError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setOtpLoading(true);
    setCanResend(false);
    setCountdown(60);

    setTimeout(() => {
      setOtpLoading(false);
      toastSuccess("OTP sent again!");
    }, 2000);
  };

  return (
    <div>
      <div className={styles.mainOtpSection}>
        <Container>
          <Row className={styles.optScreenCenter}>
            <Col className={styles.signInImageSection}>
              <div className={styles.signInImage}>
                <Image src={SignInImage} alt="Sign In" />
              </div>
            </Col>
            <Col>
              <div className={styles.formBg}>
                <div className={styles.mainContactTitle}>
                  <h1>OTP Verify</h1>
                </div>

                <Row className={styles.otpCenter}>
                  <Col lg={12}  >
                    <div className={styles.otpText}>
                      <h4>
                        We have sent a verification code to your {"email "}.
                        Please add here
                      </h4>
                    </div>
                    <form onSubmit={handleOnSubmitForm}>
                      <div className={styles.inputotpText}>
                        <OTPInput
                          isNumberInput
                          autoFocus
                          length={4}
                          className={styles.verifyOtpGridAlignments}
                          inputClassName="otpInput"
                          onChangeOTP={(otp: string) => setInputValue(otp)}
                        />
                      </div>
                      <div className={styles.otpBtnSection}>
                        <Button type="submit" disabled={loading}>
                          {loading ? "Verifying..." : "Verify"}
                        </Button>
                      </div>
                    </form>
                    <div className={styles.resendOtp}>
                      {canResend ? (
                        <p className={styles.resendOtpMessage}>
                          Didn’t Receive Code?{" "}
                          <span
                            className={styles.resendOtpText}
                            onClick={handleResendCode}
                          >
                            {otpLoading ? "loading.." : "Resend Code"}
                          </span>
                        </p>
                      ) : (
                        <p className={styles.resendOtpMessage}>
                          <span>
                            Resend In{" "}
                            <span className={styles.resendOtpNumber}>
                              0{Math.floor(countdown / 60)}:
                              {(countdown % 60).toString().padStart(2, "00")}
                            </span>
                          </span>
                        </p>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default OtpVerification;
