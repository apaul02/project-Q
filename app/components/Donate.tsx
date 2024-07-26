"use client"
import React from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import styles from "../styles/Donate.module.css";

const DonatePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.donationOptions}>
          <div className={styles.cryptoOption}>
            <Image src="/icons/upi.png" alt="UPI" width={95} height={95} />
          </div>
          <div className={styles.coffeeOption}>
            <a
              href="https://www.buymeacoffee.com/ybtheflash"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                width={217}
                height={60}
              />
            </a>
          </div>
        </div>
        <div className={styles.qrCodeContainer}>
          <Image
            src="/images/upiqr.png"
            alt="UPI QR Code"
            width={300}
            height={300}
            className="theqr"
          />
        </div>
        <p className={styles.thankYouMessage}>Why are you so nice? :)</p>
      </div>
    </div>
  );
};

export default DonatePage;
