import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== 'ciberfisicos') {
      setError('Incorrect password. Please try again.');
      return;
    }
    router.push('/');
    //set flag LOGGED IN
    sessionStorage.setItem('isLoggedIn', true);
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Please enter the password to access the site:</h2>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
            required
          />
        </label>
        {error && <div className="error">{error}</div>}
        <button type="submit">Submit</button>
        <p>Password might or might not be "ciberfisicos"</p>
      </form>
    </div>
  );
}