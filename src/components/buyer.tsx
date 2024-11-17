import React from "react";
import styles from "./buyer.module.css"; // Import CSS module
import { Home, Tractor } from "lucide-react";
// import Link from 'next/link';
const Buyer: React.FC = () => {
  return (
    <div className={styles.buyerPage}>
      <h1>Start to contribute with reliable farmers</h1>
      <h2>We help you grow healthier, higher-quality crops.</h2>
      <div className={styles.farmcard}>
        <div className={styles.card}>
          <Home />
          <h3>Join as a Buyer</h3>
          <p>
            Join our supportive community and learn from experienced farmers.
          </p>
          <button>Join as a Buyer</button>
        </div>
        <div className={styles.card}>
          <Tractor />
          <h3>Join as a Farmer</h3>
          <p>Share your knowledge and expertise to help others succeed.</p>
          <button>Join as a Farmer</button>
        </div>
      </div>
    </div>
  );
};

export default Buyer;
