import React, { useState } from 'react';
import styles from './signup.module.css';

const Signup = ({ onClose, onSwap }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Make API call for signup
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        // If response status is not OK, throw an error
        const data = await response.json();
        throw new Error(data.message);
      }

      // Reset error state on successful signup
      setError('');
      setSuccessMessage('User signed up successfully');

      // Handle response (e.g., redirect to dashboard, store user data in state/context)
    } catch (error) {
      // Set error message for user already exists, password mismatch, or general error
      setError(error.message);
      setSuccessMessage('');
    }
  };

  const handleSwap = () => {
    onSwap(); // Call the onSwap function passed from the parent component
  };

  return (
    <div className={styles.signupcontainer}>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button type="submit">Signup</button>
        <button type="button" onClick={handleSwap}>Switch to Login</button> {/* Button to swap to login */}
        {error && <p>{error}</p>}
        {successMessage && <p>{successMessage}</p>}
        <button onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default Signup;
