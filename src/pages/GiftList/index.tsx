import { useState, useEffect } from 'react';

import {
  Container, GiftsContainer, Tab,
  TabsContainer,
} from './styles';
import { useLocation, useParams } from 'react-router-dom';
import GiftCard from '../../components/GiftCard';

type IGiftBase = {
  id: number;
  name: string;
  imageUri: string;
  requestedAmount?: number;
  confirmedAmount?: number;
  color?: string;
  observation?: string;
};

type TGiftElectrical = IGiftBase & {
  electrical: true;
  voltage: '220v' | '110v' | '24v' | '12v' | '';
};

type TGiftNonElectrical = IGiftBase & {
  electrical?: false;
  voltage?: never;
};

export type TGift = TGiftElectrical | TGiftNonElectrical;

export default function GiftList() {
  const routeParams = useParams();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [selectedGiftsMock, setSelectedGiftsMock] = useState<TGift[]>([]);
  const [, setRefresh] = useState<boolean>(true);

  const examplesGifts: TGift[] = [
    { id: 1, name: 'Almofada para sofá', imageUri: 'https://d2r9epyceweg5n.cloudfront.net/stores/395/200/products/cinza-601-964249b258b2ba1cbf16173035072856-1024-1024.png', },
    { id: 2, name: 'Amassador de batata', imageUri: 'https://d2r9epyceweg5n.cloudfront.net/stores/822/939/products/519105-amassador-de-batatas-inox-cook-original-sl05461-4a5f5884d2353c9d4716933357609923-640-0.png', },
    { id: 3, name: 'Aparelho de jantar', imageUri: 'https://www.matissecasa.com.br/upload/produto/imagem/aparelho-de-jantar-goa-vista-alegre-18-pe-as.png', },
    { id: 4, name: 'Aspirador de pó', imageUri: 'https://content.electrolux.com.br/brasil/electrolux/a10n1-22/images/A10N1-1.png', electrical: true, voltage: '', },
  ];

  useEffect(() => {
    if (selectedGiftsMock.length % 4 !== 0) {
      const miss = 4 - (selectedGiftsMock.length % 4);

      for (let index = 0; index < miss; index++) {
        selectedGiftsMock.push({ id: 9999999, name: '', imageUri: '', requestedAmount: 0, confirmedAmount: 0 });
      }
      setRefresh(prev => !prev);
    }

    // console.log(selectedGiftsMock);

  }, [selectedGiftsMock]);

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
          selectedGiftsMock.map((gift, index) => (<GiftCard gift={gift} key={index} setSelectedGiftsMock={setSelectedGiftsMock} />)) :
          examplesGifts.map((gift, index) => (<GiftCard gift={gift} key={index} setSelectedGiftsMock={setSelectedGiftsMock} />))
        }
      </GiftsContainer>
    </Container>
  )
}
