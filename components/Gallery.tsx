import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "../styles/Home.module.sass";
import "swiper/css";

interface GalleryItemProps {
  image: string;
  title: string;
  description: string;
}

interface GalleryProps {
  items: GalleryItemProps[];
}

const GalleryItem = ({ image, title, description }: GalleryItemProps) => {
  return (
    <div className={styles.galleryItem}>
      <Image src={image} alt={title} width={200} height={200} />
      <p className={styles.itemTitle}>{title}</p>
      <p className={styles.itemDescription}>{description}</p>
    </div>
  );
};

const Gallery = ({ items }: GalleryProps) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.matchMedia("(max-width: 1200px)").matches);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <Swiper
          className={styles.gallery}
          slidesPerView={1.2}
          centeredSlides={true}
          spaceBetween={90}
        >
          {items.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <GalleryItem
                image={item.image}
                title={item.title}
                description={item.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <ul className={styles.cardsList}>
          {items.map((item: any, index: number) => (
            <GalleryItem
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default Gallery;
