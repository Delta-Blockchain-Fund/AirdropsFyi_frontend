import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Gallery from "../components/Gallery";
import styles from "../styles/Home.module.sass";
import EmailForm from "../components/EmailForm";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import SearchWallet from "../components/SearchWallet";
import FeedbackPopup from "../components/FeedbackPopup";

interface FeedbackPageProps {
  wallet: string;
  setWallet: Dispatch<SetStateAction<string>>;
}

const FeedbackPage = ({ wallet, setWallet }: FeedbackPageProps) => {
  const [airdropSvg, setAirdropSvg] = useState("/airdropSymbol.svg");

  const galleryItems = [
    {
      image: "/iconEmails.svg",
      title: "$ 234,456,000 +",
      description: "Emailed to subscribers",
    },
    {
      image: "/iconAirdrops.svg",
      title: "1,632",
      description: "Air Drops & NFTs",
    },
    {
      image: "/iconSubscribers.svg",
      title: "512,123",
      description: "Subscribers",
    },
  ];

  useEffect(() => {
    if (window && window.matchMedia("(prefers-color-scheme: dark)")?.matches) {
      setAirdropSvg("/airdropSymbolWhite.svg");
    }
  }, []);

  return (
    <div className={styles.container}>
      <FeedbackPopup show={true} />
    </div>
  );
};

export default FeedbackPage;
