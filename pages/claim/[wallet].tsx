import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EmailForm from "../../components/EmailForm";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SearchWallet from "../../components/SearchWallet";
import styles from "../../styles/Claim.module.sass";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const AirdropListItem = (props: any) => {
  const { name, quantity, symbol, image, link } = props;
  return (
    <div className={styles.airdropListItem}>
      <div>
        <img
          className={styles.airdropListItemImage}
          src={image}
          alt="Airdrop Token image"
          width={100}
        />
      </div>
      <div className={styles.airdropListItemInfo}>
        <h3>{name}</h3>
        <div>
          {quantity}
          <span>{symbol}</span>
        </div>
      </div>
      <div className={styles.airdropListItemLink}>
        <a href={link} target="_blank" rel="noreferrer">
          <img src="/iconExit.png" alt="Claim Tokens icon" />
        </a>
      </div>
    </div>
  );
};

const AirdropList = (props: any) => {
  const { airdrops } = props;
  return (
    <div className={styles.airdropList}>
      {airdrops?.map((airdrop: any, index: number) => (
        <AirdropListItem
          key={index}
          name={airdrop.name}
          quantity={airdrop.quantity}
          symbol={airdrop.symbol}
          image={airdrop.image}
          link={airdrop.link}
        />
      ))}
    </div>
  );
};

async function loadAirdropsToClaim(
  setAirdropsToClaim: any,
  wallet: string,
  setIsLoading: any
) {
  if (wallet.length !== 42) {
    return;
  }

  setIsLoading(true);

  const response = await fetch(`${BACKEND_URL}/airdrops/${wallet}`).catch((e) =>
    console.error(e)
  );

  if (!response?.ok) {
    return;
  }

  const data = await response?.json();

  if (data?.length) {
    const mappedData = data.map((airdrop: any) => {
      return {
        name: airdrop.Token.name,
        quantity: airdrop.amount,
        symbol: airdrop.Token.symbol,
        image: airdrop.Token.logoUrl,
        link: airdrop.Token.claimUrl,
      };
    });
    setAirdropsToClaim(mappedData);
  }

  setIsLoading(false);
}

const Claim = (props: any) => {
  const router = useRouter();
  const [urlWallet, setUrlWallet] = useState("");
  const [airdropsToClaim, setAirdropsToClaim] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { email, setEmail, wallet, setWallet } = props;

  const [airdropSvg, setAirdropSvg] = useState("/airdropSymbol.svg");

  useEffect(() => {
    if (window && window.matchMedia("(prefers-color-scheme: dark)")?.matches) {
      setAirdropSvg("/airdropSymbolWhite.svg");
    }
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const { wallet } = router.query;
    setUrlWallet(wallet as string);
  }, [router.isReady]);

  useEffect(() => {
    loadAirdropsToClaim(setAirdropsToClaim, urlWallet, setIsLoading);
  }, [urlWallet]);

  return (
    <div className={styles.claim}>
      <Head>
        <title>airdrop by Delta Blockchain</title>
        <meta name="description" content="Delta fund airdrop tracker" />
        <link rel="icon" href={airdropSvg} />
      </Head>

      <Header></Header>

      <main className={styles.main}>
        <SearchWallet />
        {isLoading ? (
          <h1 className={styles.title}>Loading your claimable tokens...</h1>
        ) : airdropsToClaim?.length > 0 ? (
          <h1 className={styles.title}>You have airdrops to claim!</h1>
        ) : (
          <h1 className={styles.title}>
            You don&apos;t have any airdrops to claim
          </h1>
        )}

        <AirdropList airdrops={airdropsToClaim} />

        <h2 className={styles.receive}>
          Receive notifications about New Airdrops in your email
        </h2>

        <EmailForm />
      </main>

      <Footer></Footer>
    </div>
  );
};

export default Claim;
