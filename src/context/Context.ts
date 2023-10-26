import { createContext } from 'react';

export interface IContext {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string;
  setError: (error: string) => void;
  logoUri: string;
}

const Context = createContext<IContext>({});

export default Context;
