import React from 'react';
import { Container, Image, LoaderDefault } from './styles';

interface LoaderProps {
  logoURI: string;
}

export default function Loader({ logoURI }: LoaderProps) {
  return (
    <>
      <Container>
        {logoURI ? <Image src={logoURI} alt='Logo' /> : <LoaderDefault />}
      </Container>
    </>
  );
}
