import Popup from "./Popup";
import { createRef, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "../styles/EmailForm.module.sass";
import { useRouter } from "next/router";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

const EmailForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    const { wallet } = router.query;
    // setUrlWallet(wallet as string);
    setWallet(wallet as string);
  }, [router.isReady]);

  const recaptchaRef = createRef<ReCAPTCHA>();

  const checkValidEmail = () => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const checkValidWallet = () => {
    return wallet.length === 42;
  };

  const setAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage("");
    }, 500);
  };

  const onReCAPTCHAChange = async (
    captchaCode: any,
    recaptchaRef: any,
    email: string,
    wallet: string
  ): Promise<void> => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      setAlertMessage(
        "reCAPTCHA token has expired, please reload and try again"
      );
      return;
    }

    const response = await fetch(`${BACKEND_URL}/register-wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        address: wallet,
        recaptchaToken: captchaCode,
      }),
    }).catch((e) => {
      setAlert(e);
      return;
    });

    const data = await response?.json();

    if (data?.message) {
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("wallet", wallet);
      window.location.href = `/subscribe`;
    }
    if (data?.error) {
      setAlert(data.error);
      return;
    }
    if (!Boolean(data)) {
      setAlert(
        "Sorry, we could not fetch your request successfully, please try again later 💻"
      );
      return;
    }

    // Reset the reCAPTCHA so that it can be executed again if user
    // submits another email.
    recaptchaRef.current.reset();

    setAlert("");
    return;
  };

  const handleEmailSubmit = (e: any) => {
    e.preventDefault();

    if (!checkValidEmail()) {
      setAlert("Please type a valid e-mail address 😉");
      return;
    }

    if (!checkValidWallet()) {
      setAlert("Please type a valid wallet address 😉");
      return;
    }

    recaptchaRef.current && recaptchaRef.current.execute();
  };

  return (
    <>
      <Popup show={!!alertMessage} title={"Oops..."} message={alertMessage} />
      <form className={styles.emailForm}>
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={(captchaCode) =>
            onReCAPTCHAChange(captchaCode, recaptchaRef, email, wallet)
          }
          className={styles.recaptcha}
        />
        <div className={styles.field}>
          <input
            type="text"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className={styles.field}>
          <input
            type="text"
            placeholder="0x96e50a34..."
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            required
            className={styles.input}
          />
          <label htmlFor="wallet">Wallet Address</label>
        </div>
        <button
          onClick={(e) => handleEmailSubmit(e)}
          type="submit"
          className={styles.button}
        >
          Subscribe
        </button>
      </form>
    </>
  );
};

export default EmailForm;
