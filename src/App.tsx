import { GlobalStyles } from './styles/GlobalStyles'
import { ToastContainer } from 'react-toastify';

import RouterComponent from './components/RouterComponent';

import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <GlobalStyles />
      <ToastContainer
        position='top-right'
        theme='colored'
      />
      <RouterComponent />
    </>
  )
}
