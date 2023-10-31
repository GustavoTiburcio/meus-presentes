import React from 'react';
import { Container, Header, Section, ValueItem } from './styles';

const MissionVisionValues: React.FC = () => {
  return (
    <Container>
      <Header>
        <h1>Missão, Visão e Valores</h1>
      </Header>
      <Section>
        <h2>Missão</h2>
        <p>Nossa Missão é facilitar e enriquecer a experiência de celebrações especiais, como casamentos, chás e outros eventos marcantes...</p>
        <h2>Visão</h2>
        <p>Nossa Visão é ser a principal referência em listas de presentes e compartilhamento de desejos para ocasiões especiais em todo o mundo...</p>
        <h2>Valores</h2>
        <ValueItem>
          <strong>Facilitação da conexão:</strong> Acreditamos na importância das relações humanas e nos esforçamos para criar oportunidades de conexão significativa em todos os momentos.
        </ValueItem>
        <ValueItem>
          <strong>Personalização e flexibilidade:</strong> Reconhecemos que cada celebração é única, e valorizamos a personalização e a flexibilidade para atender às preferências individuais de nossos usuários.
        </ValueItem>
        <ValueItem>
          <strong>Inovação contínua:</strong> Estamos comprometidos em manter nossa plataforma atualizada e relevante, adotando as últimas tecnologias e melhores práticas.
        </ValueItem>
        <ValueItem>
          <strong>Ética e confiabilidade:</strong> Priorizamos a integridade e a confiabilidade em todas as interações com nossos usuários e parceiros.
        </ValueItem>
        <ValueItem>
          <strong>Sustentabilidade:</strong> Preocupamo-nos com o impacto ambiental e social de nossas operações e buscamos maneiras de minimizar nosso impacto negativo e contribuir positivamente para a comunidade e o meio ambiente.
        </ValueItem>
      </Section>
    </Container>
  );
};

export default MissionVisionValues;
