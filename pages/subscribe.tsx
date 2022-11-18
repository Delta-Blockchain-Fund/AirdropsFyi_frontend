import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/Subscribe.module.sass';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [wallet, setWallet] = useState('');
  const [airdropSvg, setAirdropSvg] = useState('/airdropSymbol.svg');

  useEffect(() => {
    setEmail(sessionStorage.getItem('email') || '');
    setWallet(sessionStorage.getItem('wallet') || '');
    if (window && window.matchMedia('(prefers-color-scheme: dark)')?.matches) {
      setAirdropSvg('/airdropSymbolWhite.svg');
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Airdrops.fyi by Delta Blockchain Fund</title>
        <meta name='description' content='Delta fund airdrop tracker' />
        <link rel='icon' href={airdropSvg} />
      </Head>

      <Header></Header>

      <main>
        <h1 className={styles.title}>You signed up ✅</h1>

        <div className={styles.description}>
          You will receive notifications in: <span>{email}</span> about new airdrops for wallet: <span>{wallet}</span>
        </div>

        <Link href='/'>
          <div className={styles.cta}>Go to Home</div>
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default Subscribe;
