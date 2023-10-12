import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Header from '../Header';
import Loader from '../Loader';
import Copyright from '../Copyright';

//pages
import Home from '../../pages/Home';
import ErrorPage from '../../pages/ErrorPage';
import Login from '../../pages/Login';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      {
        !isLoading ?
          <Router>
            <Routes>
              <Route element={<LayoutFixo headerVisible />}>
                <Route path='/' element={<Home />} />
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
