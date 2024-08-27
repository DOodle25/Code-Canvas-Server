// Login.jsx
import React, { useState } from 'react';
import styles from './login.module.css';

const Login = ({ onClose, onSwap, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call for login validation
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        // If response status is not OK, throw an error
        throw new Error('Invalid email or password');
      }
  
      // Reset error state on successful login
      setError('');
      setIsLoggedIn(true);
      const data = await response.json();
      // Handle response (e.g., redirect to dashboard, store user data in state/context)

    } catch (error) {
      // Set error message for invalid credentials
      setError('Invalid email or password');
    }
  };

  
  const handleSwap = () => {
    onSwap(); // Call the onSwap function passed from the parent component
  };

  return (
    <div className={styles.logincontainer}>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <button type="button" onClick={handleSwap}>Switch to Signup</button> {/* Button to swap to signup */}
        {error && <p>{error}</p>} {/* Display error message if error is set */}
        <button onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default Login;
