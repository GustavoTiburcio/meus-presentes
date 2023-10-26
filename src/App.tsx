import { GlobalStyles } from './styles/GlobalStyles'
import { ToastContainer } from 'react-toastify';

import RouterComponent from './components/RouterComponent';

import 'react-toastify/dist/ReactToastify.css';
import Context, { IContext } from './context/Context';
import { useState } from 'react';
import ErrorPage from './pages/ErrorPage';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const logoUri = 'https://www.confirmeja.com.br/images/logo.png';

  const contextValues: IContext = {
    isLoading, setIsLoading, error, setError, logoUri
  };

  setTimeout(() => {
    setIsLoading(false);
  }, 1500);

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
