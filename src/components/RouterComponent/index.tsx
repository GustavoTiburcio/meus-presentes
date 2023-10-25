import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Header from '../Header';
import Loader from '../Loader';
import Copyright from '../Copyright';

//pages
import Home from '../../pages/Home';
import ErrorPage from '../../pages/ErrorPage';
import Login from '../../pages/Login';
import UserPanel from '../../pages/UserPanel';
import CreateList from '../../pages/CreateList';

function LayoutFixo({ headerVisible }: { headerVisible?: boolean }) {
  return (
    <>
      {headerVisible && <Header />}
      <Copyright />
      <Outlet />
    </>
  );
}

export default function RouterComponent() {
  const logoURI = 'https://www.confirmeja.com.br/images/logo.png';
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function PainelDeUsuarioRedirect() {
    return <Navigate to="/painelDeUsuario/inicio" replace />;
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {
        !isLoading ?
          <Router>
            <Routes>
              <Route element={<LayoutFixo headerVisible />}>
                <Route path='/' element={<Home />} />
                <Route path='/criarLista' element={<CreateList />} />
                <Route path='/painelDeUsuario' element={<PainelDeUsuarioRedirect />} />
                <Route path='/painelDeUsuario/:itemMenuRoute' element={<UserPanel />} />
              </Route>
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </Router> :
          <Loader logoURI={logoURI} />
      }
    </>
  );
}
