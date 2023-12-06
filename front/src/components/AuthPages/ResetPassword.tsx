import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword= () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const { Id } = useParams();
  useEffect(() => {
    if (Id) {
      setVerificationToken(Id);
    }
  }, []);
  const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    try {
      const response = await fetch(`https://canary.bookmythinnai.com/api/auth/reset-password/${verificationToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to reset password');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleResetPassword}>
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label>
          New Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
