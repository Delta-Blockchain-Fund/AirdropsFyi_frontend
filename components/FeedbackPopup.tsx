import styles from "../styles/Feedback.module.sass";
import { useState } from "react";
import Popup from "./Popup";
import { useRouter } from "next/router";

interface FeedbackPopupProps {
  show: boolean;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const FeedbackPopup = ({ show }: FeedbackPopupProps) => {
  const [emojiScore, setEmojiScore] = useState<number | null>(null); // 1 - 😡, 2 - 😠, 3 - 😐, 4 - 😃, 5 - 😍
  const [message, setMessage] = useState<string | null>("");
  const [isOpen, setIsOpen] = useState<boolean>(show || false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const scoreList = ["😡", "😠", "😐", "😃", "😍"];

  const router = useRouter();

  const onFeedbackSubmit = (e: any) => {
    setAlertMessage("");

    if (!emojiScore && !message) {
      setAlertMessage("Please give us a feedback before submiting the form 😉");
      setIsOpen(false);
      setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return;
    }

    fetch(`${BACKEND_URL}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: emojiScore,
        comment: message,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          setAlertMessage("We appreciate your feedback 🥰");
          return;
        } else {
          setAlertMessage(
            "We could not compute your feedback, please try again later 💻"
          );
          return;
        }
      })
      .catch((e) => {
        console.error(e);
        setAlertMessage(
          "We could not compute your feedback, please try again later 💻"
        );
        return;
      });
  };

  return (
    <div className={styles.wrapper + " feedbackPopup"}>
      <Popup
        show={isOpen}
        title="How satisfied are you with Airdrop?"
        message=""
        callback={onFeedbackSubmit}
        ctaLabel="Send feedback"
        withCloseIcon={true}
        closeCallback={() => router.push("/")}
      >
        <form
          onSubmit={(e) => onFeedbackSubmit(e)}
          method="POST"
          id="feedbackForm"
          className={styles.form}
        >
          <div className={styles.emojis}>
            {scoreList.map((el: any, index: number) => {
              return (
                <>
                  <input
                    type="radio"
                    name="Score"
                    value={`${index + 1}-point`}
                    checked={index + 1 === emojiScore}
                    className={styles.emoji}
                  />
                  <label
                    onClick={() => setEmojiScore(index + 1)}
                    htmlFor={`${index + 1}-point`}
                    className={`${
                      index + 1 === emojiScore
                        ? styles.selectedScore
                        : styles.notSelectedScore
                    }`}
                  >
                    {el}
                  </label>
                </>
              );
            })}
          </div>

          <div className={styles.textBox}>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              id="feedbackTextarea"
              name="Message"
              placeholder="Write here..."
            ></textarea>
            <label htmlFor="feedbackTextarea">Share your feedback</label>
          </div>

          <span className={styles.message}>{alertMessage}</span>
        </form>
      </Popup>
    </div>
  );
};

export default FeedbackPopup;
