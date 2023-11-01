import { createContext } from 'react';

export interface IContext {
  loginData: ILoginData;
  loginAuth: (loginData: ILoginData) => Promise<boolean | undefined>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string;
  setError: (error: string) => void;
  logoUri: string;
  handleOverlayActive: (active: boolean) => void;
}

export interface ILoginData {
  id?: string;
  name?: string;
  email: string;
  password: string;
}

const Context = createContext<IContext>({});

export default Context;
