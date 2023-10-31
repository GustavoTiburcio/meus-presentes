import { GlobalStyles } from './styles/GlobalStyles'
import { ToastContainer } from 'react-toastify';

import RouterComponent from './components/RouterComponent';

import 'react-toastify/dist/ReactToastify.css';
import Context, { IContext, ILoginData } from './context/Context';
import { useEffect, useState } from 'react';
import ErrorPage from './pages/ErrorPage';

export default function App() {
  const [loginData, setLoginData] = useState<ILoginData>({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const logoUri = 'https://www.confirmeja.com.br/images/logo.png';

  const contextValues: IContext = {
    loginData,
    saveLoginData,
    isLoading,
    setIsLoading,
    error,
    setError,
    logoUri
  };

  function saveLoginData(loginData: ILoginData) {
    setLoginData(loginData);
    if (!loginData.name && !loginData.email && !loginData.password) {
      localStorage.removeItem('@loginData');
      return;
    }
    localStorage.setItem('@loginData', JSON.stringify(loginData));
  }

  function getLoginData() {
    try {
      const loginDataStorage = localStorage.getItem('@loginData');

      if (loginDataStorage) {
        setLoginData(JSON.parse(loginDataStorage));
      }

    } catch (error: any) {
      console.log(error.message);
    }
  }

  setTimeout(() => {
    setIsLoading(false);
  }, 1500);

  useEffect(() => {
    getLoginData();
  }, []);

  return (
    <>
      <Context.Provider value={contextValues}>
        <GlobalStyles />
        <ToastContainer
          position='top-right'
          theme='colored'
        />
        {!error ?
          <RouterComponent /> :
          <ErrorPage error={error} />
        }
      </Context.Provider>
    </>
  )
}
