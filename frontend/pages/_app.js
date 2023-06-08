import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginPage from '../pages/login';

export default function App({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (!isLoggedIn) {
        router.push('/login');
      }
    });

    if (router.pathname === '/login') {
      return <LoginPage />;
    }

    return <Component {...pageProps} />;
  }