import { useNavigate } from 'react-router-dom';
import { Button, Container, Description, Title } from './styles';
import Context, { IContext } from '../../context/Context';
import { useContext } from 'react';

export default function Presentation() {
  const navigate = useNavigate();
  const { loginData }: IContext = useContext(Context);

  function handleStartButtonClick(){
    if (loginData.email && loginData.password) {
      navigate('/painelDeUsuario');
      return;
    }

    navigate('/login');
  }

  return (
    <Container>
      <Title>Bem-vindo ao MeusPresentes.com.br - O Seu Espaço de Celebração</Title>
      <Description>
        O casamento é um momento especial na vida de qualquer casal, repleto de amor, esperança e alegria. No entanto, a jornada até o grande dia pode ser desafiadora, com muitos detalhes para planejar e organizar. É por isso que estamos aqui para tornar a sua experiência de criar listas de presentes de casamento e chás mais simples, significativas e inesquecíveis.
      </Description>
      <Description>
        No MeusPresentes.com.br, acreditamos que cada casal é único, e suas listas de presentes também devem ser. Oferecemos uma plataforma intuitiva e flexível que permite aos noivos e noivas personalizar suas listas de acordo com seus gostos, necessidades e desejos. Com uma ampla seleção de presentes cuidadosamente curados e a capacidade de adicionar itens personalizados, garantimos que suas listas de casamento sejam um reflexo genuíno da sua história de amor.
      </Description>

      <Title>Por que escolher o MeusPresentes.com.br?</Title>

      <ul>
        <li><b>Simplicidade e Conveniência:</b> Criar sua lista de presentes é fácil e descomplicado. Adicione itens de diferentes lojas e categorias, compartilhe-as com seus convidados e acompanhe tudo em um só lugar.</li>
        <li><b>Variedade Sem Limites:</b> Nossa plataforma oferece uma ampla gama de produtos e experiências, desde itens tradicionais de casa até contribuições para a lua de mel e muito mais. O céu é o limite!</li>
        <li><b>Presentes com Significado:</b> Crie uma lista de presentes que conte a história do seu relacionamento. Adicione notas pessoais, compartilhe memórias e transforme sua lista em algo muito mais do que uma simples lista de desejos.</li>
        <li><b>Privacidade e Controle:</b> Você decide quem pode acessar suas listas e como deseja compartilhá-las. Mantenha o controle total da sua experiência.</li>
      </ul>

      <Title>Vantagens</Title>

      <ul>
        <li><b>Faça você mesmo:</b> Você irá criar e administrar o seu evento da forma que desejar..</li>
        <li><b>Divulgue seu evento:</b> Iremos criar um enderço exclusivo para o seu evento. Divulgue como desejar.</li>
        <li><b>Tudo simplificado:</b> Uso gratuito e sem pegadinhas. Fique à vontade 😎</li>
      </ul>
      <Button onClick={() => handleStartButtonClick()}>Começar</Button>
    </Container>
  );
};

