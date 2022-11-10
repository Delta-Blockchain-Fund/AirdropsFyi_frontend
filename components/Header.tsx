import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Header.module.sass";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.background}></div>
        <Link href={"/"}>
          <Image src="/airdropLogo.svg" alt="logo" width={150} height={150} />
        </Link>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`${styles.burger} ${showMenu ? styles.open : ""}`}
        >
          <span></span>
        </button>
      </header>
      <div
        className={`${styles.overlay} ${showMenu ? styles.open : ""}`}
        onClick={() => setShowMenu(!showMenu)}
        role="button"
      ></div>
      <div
        aria-hidden={!showMenu}
        className={`${styles.sliderMenu} ${showMenu ? styles.open : ""}`}
      >
        <ul>
          <li>
            <Link href="/" tabIndex={showMenu ? 1 : -1}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" tabIndex={showMenu ? 2 : -1}>
              About
            </Link>
          </li>
          <li>
            <Link href="/register-token" tabIndex={showMenu ? 3 : -1}>
              Register Airdrops
            </Link>
          </li>
          <li>
            <Link href="/feedback" tabIndex={showMenu ? 3 : -1}>
              Give your feedback
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
