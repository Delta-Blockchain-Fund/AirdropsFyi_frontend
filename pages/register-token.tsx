import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/RegisterToken.module.sass";
import { useState, useEffect } from "react";
import PrForm from "../components/PrForm";

const RegisterToken = () => {
  const [airdropSvg, setAirdropSvg] = useState("/airdropSymbol.svg");

  useEffect(() => {
    if (window && window.matchMedia("(prefers-color-scheme: dark)")?.matches) {
      setAirdropSvg("/airdropSymbolWhite.svg");
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>airdrop by Delta Blockchain</title>
        <meta name="description" content="Delta fund airdrop tracker" />
        <link rel="icon" href={airdropSvg} />
      </Head>
      <Header />

      <main className={styles.main}>
        <PrForm />
      </main>

      <Footer />
    </div>
  );
};

export default RegisterToken;
