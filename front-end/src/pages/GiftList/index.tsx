import { useState, useEffect, useRef, useContext } from 'react';
import ReactModal from 'react-modal';
import { useParams } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import { toast } from 'react-toastify';

import giftAnimation from '../../assets/images/giftAnimation.json';

import {
  Container, CustomInputWrapper, GiftsContainer,
  ModalContentContainer, TabContainer, Tab,
  TabsContainer,
  GiftsTab2Container,
  Tab2TitleContainer
} from './styles';
import GiftCard from '../../components/GiftCard';
import useWindowDimensions from '../../utils/WindowDimensions';
import { ActionButton, CustomInputContainer, FormContainer } from '../../components/GiftCard/styles';
import IconeDinamico from '../../components/IconeDinamico';
import { Button } from '../../components/Presentation/styles';
import api from '../../service/api';
import Context, { IContext } from '../../context/Context';
import { IGiftList } from '../UserPanel';

type TGiftBase = {
  id: number;
  name: string;
  image_uri: string;
  requestedAmount?: number;
  confirmedAmount?: number;
  color?: string;
  observation?: string;
};

type TGiftElectrical = TGiftBase & {
  electrical: true;
  voltage: '220v' | '110v' | '24v' | '12v' | '';
};

type TGiftNonElectrical = TGiftBase & {
  electrical?: false;
  voltage?: never;
};

export type TGift = TGiftElectrical | TGiftNonElectrical;

export default function GiftList() {
  const routeParams = useParams();
  const { width } = useWindowDimensions();
  const { handleOverlayActive }: IContext = useContext(Context);

  const isMobile = width <= 767;

  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [selectedGiftsMock, setSelectedGiftsMock] = useState<TGift[]>([]);
  const [examplesGifts, setExamplesGifts] = useState<TGift[]>([]);
  const [giftList, setGiftList] = useState<IGiftList>();
  const [, setRefresh] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState<TGift | undefined>();
  const [selectElectricalInputValue, setSelectElectricalInputValue] = useState<string>('Nao');

  const modalNameInputRef = useRef<HTMLInputElement | null>(null);
  const modalRequestedAmountInputRef = useRef<HTMLInputElement | null>(null);
  const modalColorInputRef = useRef<HTMLInputElement | null>(null);
  const modalVoltageInputRef = useRef<HTMLSelectElement | null>(null);
  const modalObservationInputRef = useRef<HTMLInputElement | null>(null);
  const modalImageInputRef = useRef<HTMLInputElement | null>(null);

  function handleSubmitEdit(e: React.FormEvent<HTMLFormElement>, editando: boolean) {
    e.preventDefault();

    if (!modalRequestedAmountInputRef.current?.value) {
      toast.warning('Verifique a quantidade informada.');
      return;
    }

    if (!modalNameInputRef.current?.value) {
      toast.warning('Verifique o nome do presente.');
      return;
    }

    if (editando) {
      setSelectedGiftsMock(prev => prev.map((giftMock: any) => {
        if (giftMock.id === selectedModalItem?.id) {
          return {
            id: giftMock.id,
            name: modalNameInputRef.current?.value,
            imageUri: giftMock.imageUri,
            requestedAmount: modalRequestedAmountInputRef.current?.value,
            color: modalColorInputRef.current?.value,
            observation: modalObservationInputRef.current?.value,
            ...(giftMock?.electrical && { electrical: giftMock.electrical, voltage: modalVoltageInputRef.current?.value ?? '' })
          }
        }

        return giftMock;
      }));

      toast.success('Presente foi atualizado ✔');
      setModalVisible(false);
      setSelectedModalItem(undefined);

      return;
    }

    const newItem = [{
      id: 8,
      name: modalNameInputRef.current?.value,
      imageUri: 'https://louisville.edu/research/handaresearchlab/pi-and-students/photos/nocamera.png/image',
      requestedAmount: modalRequestedAmountInputRef.current?.value,
      color: modalColorInputRef.current?.value,
      observation: modalObservationInputRef.current?.value,
      ...(selectElectricalInputValue === 'Sim' && { electrical: true, voltage: modalVoltageInputRef.current?.value ?? '' })
    }];


    setSelectedGiftsMock((prev: any) => {
      return [...prev.filter((selectedGift: any) => JSON.stringify(selectedGift) !== JSON.stringify({ id: 9999999, name: '', imageUri: '', requestedAmount: 0, confirmedAmount: 0 })), ...newItem];
    });

    toast.success(`${modalNameInputRef.current?.value} foi adicionado a lista 😁`);
    setModalVisible(false);
    setSelectedModalItem(undefined);

    return;
  }

  async function getGiftList() {
    try {
      handleOverlayActive(true);

      const response = await api.get(`/giftLists/${routeParams.id}`);

      if (response.status === 200) {
        setGiftList(response.data);

        getGiftModels(response.data.list_type_id);
      }

    } catch (error: any) {
      toast.error('Falha ao obter lista de presente. ' + error.message);
    } finally {
      handleOverlayActive(false);
    }
  }

  async function getGiftModels(listTypeId: string) {
    try {
      const response = await api.get('/giftModels', {
        params: {
          listTypeId: listTypeId
        }
      });

      if (response.status === 200) {
        setExamplesGifts(response.data);
      }
    } catch (error: any) {
      toast.error('Não foi possível obter exemplos de presente. ' + error.message);
    }
  }


  function Modal() {
    return (
      <>
        <ReactModal
          isOpen={modalVisible}
          appElement={document.getElementById('root') as HTMLElement}
          contentLabel='Minimal Modal Example'
          shouldCloseOnOverlayClick={true}
          onRequestClose={() => {
            setModalVisible(false);
            setSelectedModalItem(undefined);
          }}
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
            <h2 style={{ alignSelf: 'center' }}>{selectedModalItem?.name ?? 'Cadastro de Presente'}</h2>
            <br />
            {selectedModalItem?.image_uri && <img src={selectedModalItem.image_uri} alt={selectedModalItem?.name ?? 'Foto do Item Modal'} />}
            <FormContainer onSubmit={(e) => handleSubmitEdit(e, !(!selectedModalItem?.name && !selectedModalItem?.image_uri))}>
              <CustomInputContainer>
                <label>Nome</label>
                <input
                  placeholder='Nome do produto'
                  defaultValue={selectedModalItem?.name ?? ''}
                  ref={modalNameInputRef}
                />
              </CustomInputContainer>
              <CustomInputWrapper>
                <CustomInputContainer>
                  <label>Quantidade</label>
                  <input
                    placeholder='Quantidade desejada'
                    defaultValue={selectedModalItem?.requestedAmount ?? ''}
                    ref={modalRequestedAmountInputRef}
                    type='number'
                  />
                </CustomInputContainer>
                <CustomInputContainer>
                  <label>Cor</label>
                  <input
                    placeholder='Cor do produto'
                    defaultValue={selectedModalItem?.color ?? ''}
                    ref={modalColorInputRef}
                  />
                </CustomInputContainer>
              </CustomInputWrapper>
              {(!selectedModalItem?.name && !selectedModalItem?.image_uri) &&
                <CustomInputContainer>
                  <label>É um produto elétrico?</label>
                  <select
                    defaultValue={selectElectricalInputValue}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectElectricalInputValue(e.target.value)}
                  >
                    <option value={''} disabled hidden> - Escolha - </option>
                    <option value={'Sim'}>Sim</option>
                    <option value={'Nao'}>Não</option>
                  </select>
                </CustomInputContainer>
              }
              {(selectedModalItem?.electrical || (!selectedModalItem?.name && !selectedModalItem?.image_uri && selectElectricalInputValue === 'Sim')) &&
                <CustomInputContainer>
                  <label>Voltagem</label>
                  <select
                    defaultValue={selectedModalItem?.voltage ?? ''}
                    ref={modalVoltageInputRef}
                  >
                    <option value={''} disabled hidden> - Escolha - </option>
                    <option value={'220v'}>220v</option>
                    <option value={'110v'}>110v</option>
                    <option value={'24v'}>24v</option>
                    <option value={'12v'}>12v</option>
                  </select>
                </CustomInputContainer>
              }
              <CustomInputContainer>
                <label>Marca/Observação</label>
                <input
                  placeholder='Marca/Observação do produto'
                  defaultValue={selectedModalItem?.observation ?? ''}
                  ref={modalObservationInputRef}
                />
              </CustomInputContainer>
              <CustomInputContainer>
                <label>Imagem</label>
                <input
                  type='file'
                  accept='image/png, image/jpeg'
                  ref={modalImageInputRef}
                />
              </CustomInputContainer>
              <ActionButton
                type='submit'
              >
                <IconeDinamico nome='AiOutlineCheckCircle' />
                {!selectedModalItem?.name && !selectedModalItem?.image_uri ? 'Cadastrar' : 'Salvar'}
              </ActionButton>
            </FormContainer>
          </ModalContentContainer>
        </ReactModal >
      </>
    );
  }

  useEffect(() => {
    if (selectedGiftsMock.length % 4 !== 0) {
      const miss = 4 - (selectedGiftsMock.length % 4);

      for (let index = 0; index < miss; index++) {
        selectedGiftsMock.push({ id: 9999999, name: '', image_uri: '', requestedAmount: 0, confirmedAmount: 0 });
      }
      setRefresh(prev => !prev);
    }

    // console.log(selectedGiftsMock);

  }, [selectedGiftsMock]);

  useEffect(() => {
    if (examplesGifts.length % 4 !== 0) {
      const miss = 4 - (examplesGifts.length % 4);

      for (let index = 0; index < miss; index++) {
        examplesGifts.push({ id: 9999999, name: '', image_uri: '', requestedAmount: 0, confirmedAmount: 0 });
      }
      setRefresh(prev => !prev);
    }

    // console.log(examplesGifts);

  }, [examplesGifts]);

  useEffect(() => {
    getGiftList();
  }, [])

  return (
    <Container>
      <Modal />
      <h2>{giftList?.name ?? ''}</h2>
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
        {selectedTab === 1 ? selectedGiftsMock.length > 0 ?
          selectedGiftsMock.map((gift, index) => (
            <GiftCard
              gift={gift}
              key={index}
              setSelectedGiftsMock={setSelectedGiftsMock}
              setModalVisible={setModalVisible}
              setSelectedModalItem={setSelectedModalItem}
            />
          )) :
          (
            <TabContainer>
              <Player
                src={giftAnimation}
                className='player'
                loop
                autoplay
              />
              <p>Lista de Presentes Vazia 😢</p>
              <Button onClick={() => setSelectedTab(2)}>Começar</Button>
            </TabContainer>) :
          <TabContainer>
            <Tab2TitleContainer>
              <h2>Exemplos de Presentes</h2>
              <Button onClick={() => setModalVisible(true)}>Criar Novo Presente</Button>
            </Tab2TitleContainer>
            <GiftsTab2Container>
              {examplesGifts.map((gift, index) => (
                <GiftCard
                  gift={gift}
                  key={index}
                  setSelectedGiftsMock={setSelectedGiftsMock}
                  setModalVisible={setModalVisible}
                  setSelectedModalItem={setSelectedModalItem}
                />))}
            </GiftsTab2Container>
          </TabContainer>
        }
      </GiftsContainer>
    </Container>
  )
}
