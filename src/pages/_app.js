/* eslint-disable react/prop-types */
import 'tailwindcss/tailwind.css';
import '../styles/css/main.css';
import '../styles/sass/main.scss';
import {ContextProvider} from '@context/Context';
import auth from '@utils/auth';
import Login from './login';
import {useState, useEffect} from 'react';
import Navbar from '@components/Navbar/Navbar';

const App = ({Component, pageProps, router}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ContextProvider>
      <Navbar />
      {router.pathname.startsWith('/park') ? (
        auth.loggedIn() ? (
          <Component {...pageProps} />
        ) : (
          <Login />
        )
      ) : (
        <Component {...pageProps} />
      )}
    </ContextProvider>
  );
};

export default App;
