import { createContext } from 'react';

export interface IContext {
  loginData: ILoginData;
  saveLoginData: (loginData: ILoginData) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string;
  setError: (error: string) => void;
  logoUri: string;
}

export interface ILoginData {
  name?: string;
  email: string;
  password: string;
}

const Context = createContext<IContext>({});

export default Context;
