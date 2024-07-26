"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import styles from "./Navbar.module.css";

interface NavItem {
  name: string;
  path: string;
}

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState("large");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1210) {
        setScreenSize("large");
      } else if (window.innerWidth > 920) {
        setScreenSize("medium");
      } else if (window.innerWidth > 810) {
        setScreenSize("small");
      } else {
        setScreenSize("xsmall");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Topics", path: "/topics" },
    { name: "Generate", path: "/generate" },
    { name: "Donate", path: "/donate" },
    { name: "Account", path: "/account" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`${styles.navbar} ${styles[screenSize]}`}>
      {screenSize === "xsmall" ? (
        <>
          <button
            className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          {isMenuOpen && (
            <ul className={styles.mobileNavList}>
              {navItems.map((item) => (
                <li key={item.name} className={styles.mobileNavItem}>
                  <Link 
                    href={item.path}
                    className={`${styles.mobileNavLink} ${pathname === item.path ? styles.active : ""}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.name} className={styles.navItem}>
              <Link 
                href={item.path}
                className={`${styles.navLink} ${pathname === item.path ? styles.active : ""}`}
              >
                {item.name}
                {pathname === item.path && <span className={styles.activeIndicator}></span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;