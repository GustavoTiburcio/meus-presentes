import { useContext, useEffect } from 'react';
import Context, { IContext, ILoginData } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginValidator() {
  const { loginData }: IContext = useContext(Context);
  const navigate = useNavigate();

  function loginValidate(loginData: ILoginData) {
    if (JSON.stringify(loginData) === JSON.stringify({ name: '', email: '', password: '' })) {
      toast.warning('Faça login para continuar.');
      navigate('/login');
      return;
    }
  }

  useEffect(() => {
    loginValidate(loginData);
  }, [])

  return (<></>);
}
