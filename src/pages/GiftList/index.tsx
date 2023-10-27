import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useLocation, useParams } from 'react-router-dom';

import {
  Container, CustomInputWrapper, GiftsContainer, ModalContentContainer, Tab,
  TabsContainer,
} from './styles';
import GiftCard from '../../components/GiftCard';
import useWindowDimensions from '../../utils/WindowDimensions';
import { ActionButton, CustomInputContainer, FormContainer } from '../../components/GiftCard/styles';
import IconeDinamico from '../../components/IconeDinamico';

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
  const { width } = useWindowDimensions();

  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [selectedGiftsMock, setSelectedGiftsMock] = useState<TGift[]>([]);
  const [, setRefresh] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState<TGift>();

  const isMobile = width <= 767;

  const examplesGifts: TGift[] = [
    { id: 1, name: 'Almofada para sofá', imageUri: 'https://d2r9epyceweg5n.cloudfront.net/stores/395/200/products/cinza-601-964249b258b2ba1cbf16173035072856-1024-1024.png', },
    { id: 2, name: 'Amassador de batata', imageUri: 'https://d2r9epyceweg5n.cloudfront.net/stores/822/939/products/519105-amassador-de-batatas-inox-cook-original-sl05461-4a5f5884d2353c9d4716933357609923-640-0.png', },
    { id: 3, name: 'Aparelho de jantar', imageUri: 'https://www.matissecasa.com.br/upload/produto/imagem/aparelho-de-jantar-goa-vista-alegre-18-pe-as.png', },
    { id: 4, name: 'Aspirador de pó', imageUri: 'https://content.electrolux.com.br/brasil/electrolux/a10n1-22/images/A10N1-1.png', electrical: true, voltage: '', },
  ];


  function Modal() {
    return (
      <>
        <ReactModal
          isOpen={modalVisible}
          appElement={document.getElementById('root') as HTMLElement}
          contentLabel='Minimal Modal Example'
          shouldCloseOnOverlayClick={true}
          onRequestClose={() => setModalVisible(false)}
          style={{
            overlay: {
              backgroundColor: '#1D1D1D',
              opacity: 0.9,
              zIndex: 99
            },
            content: {
              display: 'flex',
              height: '35rem',
              width: isMobile ? '60%' : '30%',
              // margin: 'auto',
              margin: 'auto',
              justifyContent: 'center'
            },
          }}
        >
          <ModalContentContainer>
            <h2 style={{ alignSelf: 'center' }}>{selectedModalItem?.name}</h2>
            <br />
            <img src={selectedModalItem?.imageUri ?? ''} alt={selectedModalItem?.name ?? 'Item Modal'} />
            <FormContainer>
              <CustomInputContainer>
                <label>Nome</label>
                <input
                  placeholder='Nome do produto'
                  value={selectedModalItem?.name ?? ''}
                // onChange={
                //   (e: React.ChangeEvent<HTMLInputElement>) => {
                //     setInputsValues((prev: any) => ({ ...prev, requestedAmount: e.target.value }));
                //   }
                // }
                />
              </CustomInputContainer>
              <CustomInputWrapper>
                <CustomInputContainer>
                  <label>Quantidade</label>
                  <input
                    placeholder='Quantidade desejada'
                    value={selectedModalItem?.requestedAmount ?? ''}
                  // onChange={
                  //   (e: React.ChangeEvent<HTMLInputElement>) => {
                  //     setInputsValues((prev: any) => ({ ...prev, requestedAmount: e.target.value }));
                  //   }
                  // }
                  />
                </CustomInputContainer>
                <CustomInputContainer>
                  <label>Cor</label>
                  <input
                    placeholder='Cor do produto'
                    value={selectedModalItem?.color ?? ''}
                  // onChange={
                  //   (e: React.ChangeEvent<HTMLInputElement>) => {
                  //     setInputsValues((prev: any) => ({ ...prev, requestedAmount: e.target.value }));
                  //   }
                  // }
                  />
                </CustomInputContainer>
              </CustomInputWrapper>
              {selectedModalItem?.electrical &&
                <CustomInputContainer>
                  <label>Voltagem</label>
                  <select
                    value={selectedModalItem?.voltage ?? ''}
                  // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  //   setInputsValues((prev: any) => ({ ...prev, electrical: true, voltage: e.target.value }));
                  // }}
                  >
                    <option value={''} disabled hidden> - Escolha - </option>
                    <option value={'220v'}>220v</option>
                    <option value={'110v'}>110v</option>
                    <option value={'24v'}>24v</option>
                    <option value={'12v'}>12v</option>
                  </select>
                </CustomInputContainer>}
              <CustomInputContainer>
                <label>Marca/Observação</label>
                <input
                  placeholder='Marca/Observação do produto'
                  value={selectedModalItem?.observation ?? ''}
                // onChange={
                //   (e: React.ChangeEvent<HTMLInputElement>) => {
                //     setInputsValues((prev: any) => ({ ...prev, requestedAmount: e.target.value }));
                //   }
                // }
                />
              </CustomInputContainer>
              <CustomInputContainer>
                <label>Imagem</label>
                <input
                  type='file'
                  accept="image/png, image/jpeg"
                />
              </CustomInputContainer>
              <ActionButton
                type='submit'
              >
                <IconeDinamico nome='AiOutlineCheckCircle' />
                Salvar
              </ActionButton>
            </FormContainer>
            {/* {JSON.stringify(selectedModalItem)} */}
          </ModalContentContainer>
        </ReactModal>
      </>
    );
  }

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
      <Modal />
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
            <GiftCard
              gift={gift}
              key={index}
              setSelectedGiftsMock={setSelectedGiftsMock}
              setModalVisible={setModalVisible}
              setSelectedModalItem={setSelectedModalItem}
            />
          )) :
          examplesGifts.map((gift, index) => (
            <GiftCard
              gift={gift}
              key={index}
              setSelectedGiftsMock={setSelectedGiftsMock}
              setModalVisible={setModalVisible}
              setSelectedModalItem={setSelectedModalItem}
            />))
        }
      </GiftsContainer>
    </Container>
  )
}
