import React from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import styles from "../styles/Topics.module.css";

const topicsData = [
  { name: "Cyber Security", image: "/images/cyber-security.jpg" },
  { name: "Biology", image: "/images/biology.png" },
  { name: "Chemistry", image: "/images/chemistry.png" },
  { name: "Physics", image: "/images/physics.jpg" },
  { name: "Aptitude", image: "/images/aptitude.jpg" },
  { name: "Web Development", image: "/images/web-development.jpg" },
  { name: "DSA", image: "/images/dsa.jpg" },
  { name: "General Knowledge", image: "/images/general-knowledge.png" },
];

const Topics: React.FC = () => {
  return (
    <div className={styles.topicsContainer}>
      <div className={styles.navbarWrapper}>
        <Navbar />
      </div>
      <h1 className={styles.pageTitle}>Topics</h1>
      <div className={styles.topicsGrid}>
        {topicsData.map((topic, index) => (
          <div key={index} className={styles.topicCard}>
            <Image
              src={topic.image}
              alt={topic.name}
              width={300}
              height={300}
              className={styles.topicImage}
            />
            <h2 className={styles.topicTitle}>{topic.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topics;
