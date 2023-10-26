import { Container, Image, LoaderDefault } from './styles';

interface LoaderProps {
  logoUri: string;
}

export default function Loader({ logoUri }: LoaderProps) {
  return (
    <>
      <Container>
        {logoUri ? <Image src={logoUri} alt='Logo' /> : <LoaderDefault />}
      </Container>
    </>
  );
}
