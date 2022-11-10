import { useState } from "react";
import Popup from "./Popup";
import styles from "../styles/SearchWallet.module.sass";

const SearchWallet = (props: any) => {
  const [wallet, setWallet] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  function redirectToClaimIfWalletIsValid() {
    if (wallet.length === 42) {
      window.location.href = `/claim/${wallet}`;
    } else {
      setAlertMessage("Please type a valid wallet address 😉");
      setTimeout(() => {
        setAlertMessage("");
      }, 500);
    }
  }

  return (
    <div className={styles.searchWallet}>
      <Popup show={!!alertMessage} title={"Oops..."} message={alertMessage} />

      <div className={styles.left}>
        <input
          id="wallet"
          type="text"
          placeholder="0x96e50a34..."
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
        <label className={styles.title} htmlFor="wallet">
          Wallet Address
        </label>
      </div>
      <div className={styles.right}>
        <button onClick={() => redirectToClaimIfWalletIsValid()}>
          <img src="/iconMagGlass.png" alt="Magnifying glass icon" />
        </button>
      </div>
    </div>
  );
};

export default SearchWallet;
