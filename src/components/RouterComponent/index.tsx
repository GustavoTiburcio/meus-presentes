import { useContext } from 'react';
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
import Context, { IContext } from '../../context/Context';

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
  const { isLoading, logoUri }: IContext = useContext(Context);

  function PainelDeUsuarioRedirect() {
    return <Navigate to="/painelDeUsuario/inicio" replace />;
  }

  return (
    <>
      {
        !isLoading ?
          <Router>
            <Routes>
              <Route element={<LayoutFixo headerVisible />}>
                <Route path='/' element={<Home />} />
                <Route path='/criarLista' element={<CreateList />} />
                <Route path='/criarLista/:id' element={<CreateList />} />
                <Route path='/painelDeUsuario' element={<PainelDeUsuarioRedirect />} />
                <Route path='/painelDeUsuario/:itemMenuRoute' element={<UserPanel />} />
              </Route>
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </Router> :
          <Loader logoUri={logoUri} />
      }
    </>
  );
}
