import Image from 'next/image';
import styles from '../styles/Footer.module.sass';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.card}>
        <p className={styles.subtext}>Airdrops.fyi is an open source project by</p>
        <Image src='/deltaLogo.png' alt='logo' width={96} height={96} />
      </div>
    </footer>
  );
};

export default Footer;
