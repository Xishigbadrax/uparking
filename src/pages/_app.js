
import 'tailwindcss/tailwind.css';
import '../styles/css/main.css';
import '../styles/sass/main.scss';
import { ContextProvider } from '@context/Context';
import auth from '@utils/auth';
import Login from './login';
import { useState , useEffect } from "react";
import Navbar from '@components/Navbar';

const App = ({ Component, pageProps }) => {
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if(!isMounted) {
    return null;
  }

  return (
    <ContextProvider>
      <Navbar></Navbar>
      <Component {...pageProps}/>
      {/* {
        auth.loggedIn()
          ? <Component {...pageProps}/>
          : <Login />
      } */}
    </ContextProvider>
  );
};

export default App;
