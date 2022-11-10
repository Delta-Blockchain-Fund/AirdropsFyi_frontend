import { useEffect, useState } from "react";
import styles from "../styles/Popup.module.sass";

interface PopupProps {
  show: boolean;
  title: string;
  message?: string;
  isError?: boolean;
  ctaLabel?: string;
  children?: React.ReactNode;
  withCloseIcon?: boolean;
  callback?: (e: any | undefined) => any;
  closeCallback?: () => any;
}

export const Popup = ({
  show,
  title,
  message,
  isError,
  ctaLabel,
  children,
  withCloseIcon,
  callback,
  closeCallback,
}: PopupProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [shownMessage, setShownMessage] = useState("");

  const handleCtaClick = () => {
    if (callback) {
      callback(undefined);
    } else {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    show && setShowPopup(show);
    show && message && setShownMessage(message);
  }, [show]);

  return (
    <>
      {showPopup && (
        <>
          <div className={styles.overlay}></div>
          <div
            className={`${styles.popup} ${isError ? styles.error : ""} popup`}
          >
            {withCloseIcon && (
              <button
                onClick={() => {
                  closeCallback ? closeCallback() : setShowPopup(false);
                }}
                className={styles.closeIcon}
              ></button>
            )}
            <h1 className={styles.title}>{title}</h1>
            {children ? children : ""}
            <p className={styles.message}>{shownMessage}</p>
            <button onClick={handleCtaClick} className={styles.cta}>
              {ctaLabel || "OK"}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Popup;
