'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signup, SignupResult } from '../lib/actions/signup';
import styles from "../styles/Signup.module.css";
import { signIn } from 'next-auth/react';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    referral: "",
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
  
    if (!agreeTerms) {
      setError('You must agree to the Terms & Privacy.');
      return;
    }
  
    try {
      const result: SignupResult = await signup(
        formData.name,
        formData.email,
        formData.username,
        formData.password,
        formData.referral
      );
      
  
      if (result.error) {
        setError(result.error);
      } else if (result.message) {
        setMessage(`${result.message}${result.referralCode ? ` Your referral code is: ${result.referralCode}` : ''}`);
        // router.push('/'); // Redirect immediately on success
      }
      const response = await signIn("credentials", {
        email : formData.email,
        password : formData.password,
        redirect: false
      });
      if (response?.error) {
        console.error('SignIn Error:', result.error);
        setError("Failed to SignIn after SignUp");
        return;
      } else {
        console.log('SignIn Successful:', result);
        router.push('/');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Get Started Now</h1>
        <p className={styles.subtitle}>
          Just a quick signup and you're in for a treat!
        </p>

        <button className={styles.googleButton}>
          <span>Sign in with Google</span>
        </button>

        <div className={styles.divider}>
          <hr />
          <span>or</span>
          <hr />
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Sourish Bose"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="andrewgarfield@abc.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="machoman69"
              required
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
              placeholder="Min 8 characters"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="referral">Referral Code (optional)</label>
            <input
              type="text"
              id="referral"
              name="referral"
              value={formData.referral}
              onChange={handleInputChange}
              placeholder="Enter referral code"
            />
          </div>

          <div className={styles.terms}>
            <input 
              type="checkbox" 
              id="terms" 
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <label htmlFor="terms">
              I agree to the <a href="#">Terms & Privacy</a>
            </label>
          </div>

          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}
        {message && <p className={styles.success}>{message}</p>}

        <p className={styles.login}>
          Already have an account? <a href="login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;