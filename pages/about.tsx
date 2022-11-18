import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/About.module.sass';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const About = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [airdropSvg, setAirdropSvg] = useState('/airdropSymbol.svg');

  const handleResize = () => {
    setIsMobile(window.matchMedia('(max-width: 1023px)').matches);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const stepsList = [
    {
      title: 'Enter your wallet address',
      subtitle: 'EVM addresses',
    },
    {
      title: 'Link it with your e-mail address',
      subtitle: "Subscribe to get notified for upcoming airdrops you're eligible for",
      isOptional: true,
    },
    {
      title: 'Check out all the eligible airdrops',
      subtitle: 'You can claims them all',
    },
    {
      title: "Claim your airdrops from the projects's claim page",
      subtitle: "Navitage to the project's page to claim the airdrop",
    },
  ];

  useEffect(() => {
    if (window && window.matchMedia('(prefers-color-scheme: dark)')?.matches) {
      setAirdropSvg('/airdropSymbolWhite.svg');
    }
  }, []);

  return (
    <div className='about'>
      <Head>
        <title>Airdrops.fyi by Delta Blockchain Fund</title>
        <meta name='description' content='Delta fund airdrop tracker' />
        <link rel='icon' href={airdropSvg} />
      </Head>

      <Header></Header>

      <main className={styles.main}>
        <div className={styles.intro}>
          <h1 className={styles.title}>About us</h1>
          This is an open-source project developed by <a href='https://www.deltafund.io/'>Delta Blockchain Fund</a>. The
          project aims to help the community in finding and claiming the airdrops they are eligible for{' '}
          <a
            style={{ display: 'inline', color: 'blue', textDecoration: 'underline' }}
            href='https://github.com/Delta-Blockchain-Fund'
          >
            Github repository here
          </a>
          .
        </div>
        <div className={styles.howTo}>
          <h1 className={styles.title}>How to use Airdrop:</h1>
          {isMobile ? (
            <Swiper slidesPerView={1.5} centeredSlides={false} spaceBetween={70}>
              {stepsList.map((el: any, index: number) => {
                return (
                  <SwiperSlide key={index}>
                    <li>
                      <h2>{el.title}</h2>
                      <h3>{el.subtitle}</h3>
                      {el.isOptional ? <p>Optional</p> : ''}
                    </li>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <ol className={styles.cardsList}>
              {stepsList.map((el: any, index: number) => {
                return (
                  <li key={index}>
                    <h2>{el.title}</h2>
                    <h3>{el.subtitle}</h3>
                    {el.isOptional ? <p>Optional</p> : ''}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
        <div className={styles.last}>
          <h2>We are excited to launch this non-profit project for the community.</h2>
          <h2 style={{ display: 'inline' }}>
            For more information about the project please read our blog post{' '}
            <a
              style={{ display: 'inline', color: 'blue', textDecoration: 'underline' }}
              href='https://www.deltafund.io/post/airdrops-fyi-check-eligible-airdrops'
            >
              here
            </a>
          </h2>
          <h2 style={{ display: 'inline' }}>
            The project is not maintained on a daily basis but we welcome everyone to contribute to it. If you have any
            questions or would like to contribute please{' '}
            <a
              style={{ display: 'inline', color: 'blue', textDecoration: 'underline' }}
              href='mailto:contactus@deltafund.io'
            >
              contact us
            </a>
          </h2>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default About;
