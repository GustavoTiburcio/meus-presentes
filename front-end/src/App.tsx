import { useEffect, useState } from 'react';
import { GlobalStyles } from './styles/GlobalStyles'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import LoadingOverlay from 'react-loading-overlay-ts';

import RouterComponent from './components/RouterComponent';
import ErrorPage from './pages/ErrorPage';

import Context, { IContext, ILoginData } from './context/Context';
import api from './service/api';
import styled from 'styled-components';

const StyledLoader = styled(LoadingOverlay)`
  min-height: 100vh;
`

export default function App() {
  const [loginData, setLoginData] = useState<ILoginData>({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [overlayLoadingActive, setOverlayLoadingActive] = useState(false);
  const [error, setError] = useState<string>('');
  const logoUri = 'https://www.confirmeja.com.br/images/logo.png';


  const contextValues: IContext = {
    loginData,
    loginAuth,
    isLoading,
    setIsLoading,
    error,
    setError,
    logoUri,
    handleOverlayActive
  };

  function handleOverlayActive(active: boolean) {
    if (!active) {
      setTimeout(() => {
        setOverlayLoadingActive(active);
      }, 500);
      return
    }
    setOverlayLoadingActive(active);
  }

  async function loginAuth(loginData: ILoginData) {
    try {
      if (JSON.stringify(loginData) === JSON.stringify({ name: '', email: '', password: '' })) {
        Cookies.remove('@loginData', { domain: window.location.hostname });
        setLoginData({ name: '', email: '', password: '' });
        return;
      }

      const response = await api.post('/login', loginData);

      if (response.status === 200) {
        setLoginData(response.data);
        Cookies.set('@loginData', JSON.stringify(response.data), { expires: 7, domain: window.location.hostname });
        return true;
      }

      throw new Error("Não foi possível autenticar login");
    } catch (error: any) {
      Cookies.remove('@loginData', { domain: window.location.hostname });
      if (error.response.status === 401) {
        toast.error('Usuário e/ou senha inválidos.');
        return;
      }
      toast.error('Falha no login. ' + error.message);
    }
  }

  function getLoginData() {
    try {
      const loginDataStorage = Cookies.get('@loginData');

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
        <StyledLoader
          active={overlayLoadingActive}
          spinner
        >
          <GlobalStyles />
          <ToastContainer
            position='top-right'
            theme='colored'
          />
          {!error ?
            <RouterComponent /> :
            <ErrorPage error={error} />
          }
        </StyledLoader>
      </Context.Provider>
    </>
  )
}
