'use client';

import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Login.module.css";

export const Signin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.branding}>
          <Image
            src="/images/brand-icon.png"
            alt="Brand Icon"
            width={50}
            height={50}
            className={styles.brandIcon}
          />
          <h1 className={styles.brandName}>ezPrep AI</h1>
        </div>

        <h2 className={styles.title}>Welcome Back</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
          </div>

          <div className={styles.forgotPassword}>
            <Link href="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className={styles.submitButton}>
            Log In
          </button>
        </form>

        <div className={styles.divider}>
          <hr />
          <span>or</span>
          <hr />
        </div>

        <button className={styles.googleButton} onClick={handleGoogleSignIn}>
          <Image
            src="/google-icon.svg"
            alt="Google Icon"
            width={20}
            height={20}
            className={styles.googleIcon}
          />
          <span>Sign in with Google</span>
        </button>

        <p className={styles.signup}>
          Don't have an account? <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

