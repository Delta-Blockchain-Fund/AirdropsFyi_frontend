import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Gallery from '../components/Gallery';
import styles from '../styles/Home.module.sass';
import EmailForm from '../components/EmailForm';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import SearchWallet from '../components/SearchWallet';
import Script from 'next/script';

interface HomeProps {
  wallet: string;
  setWallet: Dispatch<SetStateAction<string>>;
}

const Home = ({ wallet, setWallet }: HomeProps) => {
  const [airdropSvg, setAirdropSvg] = useState('/airdropSymbol.svg');

  const [galleryItems, setGalleryItems] = useState<any>([]);

  const loadGalleryItems = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/info/gallery-items`);
      const data = await res.json();
      setGalleryItems([data[1]]);
    } catch (e) {
      const gallery = [
        // {
        //   image: '/iconEmails.svg',
        //   title: 'Subscribe and Receive',
        //   description: 'Airdrop release emails',
        // },
        {
          image: '/iconAirdrops.svg',
          title: 'Many Airdrops & NFTs',
          description: 'Already registered in our platform',
        },
        // {
        //   image: '/iconSubscribers.svg',
        //   title: 'Thousands of people',
        //   description: 'Already subscribed',
        // },
      ];

      setGalleryItems(gallery);
    }
  };

  useEffect(() => {
    if (window && window.matchMedia('(prefers-color-scheme: dark)')?.matches) {
      setAirdropSvg('/airdropSymbolWhite.svg');
    }
    loadGalleryItems();
  }, []);

  return (
    <>
      <Script strategy='afterInteractive' src='https://www.googletagmanager.com/gtag/js?id=G-HTY38FY4WB' />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HTY38FY4WB', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      <div className={`${styles.container} home`}>
        <Head>
          <title>Airdrops.fyi by Delta Blockchain Fund</title>
          <meta name='description' content='Delta fund airdrop tracker' />
          <link rel='icon' href={airdropSvg} />
        </Head>
        <Header />

        <main className={styles.main}>
          <h1 className={styles.title}>Find Unclaimed Airdrops</h1>
          <h2 className={styles.subtitle}>Airdrop.fyi lets you search for airdrops that you may have missed.</h2>
          <SearchWallet wallet={wallet} setWallet={setWallet} />
          {/* Disabled this for time being */}
          <Gallery items={galleryItems} />
          <h3 className={styles.emailTitle}>Get Notified when you are eligible for an airdrop</h3>
          <EmailForm />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;
