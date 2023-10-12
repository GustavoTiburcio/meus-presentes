import React from 'react';
import { Button, Container, GifDiv } from './styles';

interface PaginaNaoEncontradaProps {
  error?: string;
}

export default function ErrorPage({ error }: PaginaNaoEncontradaProps) {
  return (
    <Container>
      <h1>{error ? 'Falha ao carregar' : '404'}</h1>
      <GifDiv />
      <h2>{error ? error : 'Parece que você está perdido'}</h2>
      <span>
        {error ?
          'Verfique sua conexão com a internet. Caso o problema persista, entre em contato com o responsável técnico.'
          : 'A página que está procurando não está disponível, verique a URL digitada.'
        }
      </span>
      {!error && <a href='/'>
        <Button>
          Página Inicial
        </Button>
      </a>}
    </Container>
  );
}
