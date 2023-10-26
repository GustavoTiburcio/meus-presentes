import { useState } from 'react';

import { ActionButton, ButtonsContainer, Container, Gift, GiftsContainer, Tab, TabsContainer } from './styles';
import { useLocation, useParams } from 'react-router-dom';
import IconeDinamico from '../../components/IconeDinamico';

interface IGift {
  name: string;
  imageUri: string;
  requestedAmount?: number;
  confirmedAmount?: number;
}

export default function GiftList() {
  const routeParams = useParams();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<number>(1);

  const selectedGiftsMock: IGift[] = [
    { name: 'Almofada para sofá', imageUri: 'https://d2r9epyceweg5n.cloudfront.net/stores/395/200/products/cinza-601-964249b258b2ba1cbf16173035072856-1024-1024.png', requestedAmount: 4, confirmedAmount: 0 },
    { name: 'Almofada para sofá', imageUri: 'https://d2r9epyceweg5n.cloudfront.net/stores/395/200/products/cinza-601-964249b258b2ba1cbf16173035072856-1024-1024.png', requestedAmount: 4, confirmedAmount: 0 },
    { name: 'Amassador de batata', imageUri: 'https://brinox.vteximg.com.br/arquivos/ids/249487-1200-800/Amassador-de-Batatas---Top-Pratic-23-cm---Brinox.jpg?v=637001697564500000', requestedAmount: 1, confirmedAmount: 1 },
    { name: 'Aparelho de jantar', imageUri: 'https://www.matissecasa.com.br/upload/produto/imagem/aparelho-de-jantar-goa-vista-alegre-18-pe-as.png', requestedAmount: 2, confirmedAmount: 1 },
    { name: 'Aparelho de jantar', imageUri: 'https://www.matissecasa.com.br/upload/produto/imagem/aparelho-de-jantar-goa-vista-alegre-18-pe-as.png', requestedAmount: 2, confirmedAmount: 1 },
    { name: 'Aspirador de pó', imageUri: 'https://content.electrolux.com.br/brasil/electrolux/a10n1-22/images/A10N1-1.png', requestedAmount: 1, confirmedAmount: 0 },
    { name: 'Aspirador de pó', imageUri: 'https://content.electrolux.com.br/brasil/electrolux/a10n1-22/images/A10N1-1.png', requestedAmount: 1, confirmedAmount: 0 },
  ];

  const examplesGifts: IGift[] = [
    { name: 'Almofada para sofá', imageUri: 'https://d2r9epyceweg5n.cloudfront.net/stores/395/200/products/cinza-601-964249b258b2ba1cbf16173035072856-1024-1024.png', requestedAmount: 4, confirmedAmount: 0 },
    { name: 'Amassador de batata', imageUri: 'https://brinox.vteximg.com.br/arquivos/ids/249487-1200-800/Amassador-de-Batatas---Top-Pratic-23-cm---Brinox.jpg?v=637001697564500000', requestedAmount: 1, confirmedAmount: 1 },
    { name: 'Aparelho de jantar', imageUri: 'https://www.matissecasa.com.br/upload/produto/imagem/aparelho-de-jantar-goa-vista-alegre-18-pe-as.png', requestedAmount: 2, confirmedAmount: 1 },
    { name: 'Aspirador de pó', imageUri: 'https://content.electrolux.com.br/brasil/electrolux/a10n1-22/images/A10N1-1.png', requestedAmount: 1, confirmedAmount: 0 },
  ];

  if (selectedGiftsMock.length % 4 !== 0) {
    const miss = 4 - (selectedGiftsMock.length % 4);

    for (let index = 0; index < miss; index++) {
      selectedGiftsMock.push({ name: '', imageUri: '', requestedAmount: 0, confirmedAmount: 0 });
    }
  }

  return (
    <Container>
      <h2>{routeParams?.id ?? ''} - {location.state?.name ?? ''}</h2>
      <p>Adicione, Crie ou Remova presentes da sua lista!</p>
      <br />
      <TabsContainer>
        <Tab
          $isSelected={selectedTab === 1}
          onClick={() => { if (selectedTab !== 1) setSelectedTab(1) }}
        >
          Presentes Escolhidos</Tab>
        <Tab
          $isSelected={selectedTab === 2}
          onClick={() => { if (selectedTab !== 2) setSelectedTab(2) }}
        >
          Escolher Presentes
        </Tab>
      </TabsContainer>
      <GiftsContainer>
        {selectedTab === 1 ?
          selectedGiftsMock.map((gift, index) => (
            <Gift key={index} hidden={!gift.name && !gift.imageUri}>
              <b>{gift.name}</b>
              <img src={gift.imageUri} alt={gift.name} title={gift.name} />
              <hr />
              <p>Solicitado: {gift.requestedAmount} unidades</p>
              <p>Confirmado: {gift.confirmedAmount} unidades</p>
              <ButtonsContainer>
                <ActionButton>
                  <IconeDinamico nome='AiOutlineEdit' />
                  Editar
                </ActionButton>
                <ActionButton>
                  <IconeDinamico nome='AiOutlineDelete' />
                  Excluir
                </ActionButton>
              </ButtonsContainer>
            </Gift>)) :
          examplesGifts.map((gift, index) => (
            <Gift key={index} hidden={!gift.name && !gift.imageUri}>
              <b>{gift.name}</b>
              <img src={gift.imageUri} alt={gift.name} title={gift.name} />
              <hr />
              <ButtonsContainer>
                <ActionButton>
                  <IconeDinamico nome='AiOutlineCheckCircle' />
                  Adicionar
                </ActionButton>
              </ButtonsContainer>
            </Gift>))
        }
      </GiftsContainer>
    </Container>
  )
}
