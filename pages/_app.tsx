import "../styles/globals.sass";
import type { AppProps } from "next/app";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [walletForm, setWalletForm] = useState("");

  return (
    <Component
      {...pageProps}
      email={email}
      setEmail={setEmail}
      wallet={wallet}
      setWallet={setWallet}
      walletForm={walletForm}
      setWalletForm={setWalletForm}
    />
  );
}

export default MyApp;
