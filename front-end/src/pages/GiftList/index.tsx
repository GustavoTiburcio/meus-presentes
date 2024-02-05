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
  id?: string;
  name: string;
  image_uri: string;
  created_at?: string;
};

type TGiftElectrical = TGiftBase & {
  electrical: true;
  voltage: string;
  requested_amount?: number;
  confirmed_amount?: number;
  color?: string;
  observation?: string;
  gift_list_id?: string;
};

type TGiftNonElectrical = TGiftBase & {
  electrical?: false;
  voltage?: never;
  requested_amount?: number;
  confirmed_amount?: number;
  color?: string;
  observation?: string;
  gift_list_id?: string;
};

export type TGift = TGiftElectrical | TGiftNonElectrical;

export default function GiftList() {
  const routeParams = useParams();
  const { width } = useWindowDimensions();
  const { handleOverlayActive }: IContext = useContext(Context);

  const isMobile = width <= 767;

  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [selectedGifts, setSelectedGifts] = useState<TGift[]>([]);
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>, editing: boolean) {
    try {
      e.preventDefault();
      if (!modalRequestedAmountInputRef.current?.value || +modalRequestedAmountInputRef.current?.value < 1) {
        toast.warning('Verifique a quantidade informada.');
        return;
      }

      if (!modalNameInputRef.current?.value) {
        toast.warning('Informe o nome do presente.');
        return;
      }

      if (selectElectricalInputValue === 'Sim' && !modalVoltageInputRef.current?.value) {
        toast.warning('Informe a voltagem do presente.');
        return;
      }

      handleOverlayActive(true);

      if (editing) {
        if (!selectedModalItem?.id) {
          toast.error('Ocorreu um erro ao editar o presente. Não foi possível encontrar o id do presente');
          return;
        }

        const editedItem: any = {
          id: selectedModalItem.id,
          name: modalNameInputRef.current?.value,
          image_uri: selectedModalItem?.image_uri,
          requested_amount: modalRequestedAmountInputRef.current?.value ? +modalRequestedAmountInputRef.current.value : 1,
          color: modalColorInputRef.current?.value,
          observation: modalObservationInputRef.current?.value,
          ...(selectedModalItem?.electrical && { electrical: true, voltage: modalVoltageInputRef.current?.value ?? '' })
        }

        if (modalImageInputRef.current?.files) {
          const imageShackUri = await handleFileUpload(modalImageInputRef.current.files[0]);

          if (imageShackUri) {
            editedItem.image_uri = 'https://' + imageShackUri;
          }
        }

        const response = await putGift(editedItem);

        if (response) {
          getGiftList();

          toast.success('Presente foi atualizado ✔');
          setModalVisible(false);
        }

        return;
      }

      const newItem: TGift[] = [];

      if (selectElectricalInputValue === 'Sim') {
        newItem.push({
          electrical: true,
          voltage: modalVoltageInputRef.current?.value ?? '',
          name: modalNameInputRef.current?.value,
          image_uri: 'https://imagizer.imageshack.com/img923/3689/mkw7ux.png',
          requested_amount: +modalRequestedAmountInputRef.current?.value ?? 1,
          color: modalColorInputRef.current?.value,
          observation: modalObservationInputRef.current?.value,
          gift_list_id: routeParams.id,
        });
      } else {
        newItem.push({
          name: modalNameInputRef.current?.value,
          image_uri: 'https://imagizer.imageshack.com/img923/3689/mkw7ux.png',
          requested_amount: +modalRequestedAmountInputRef.current?.value ?? 1,
          color: modalColorInputRef.current?.value,
          observation: modalObservationInputRef.current?.value,
          gift_list_id: routeParams.id,
        });
      }

      if (modalImageInputRef.current?.files) {
        const imageShackUri = await handleFileUpload(modalImageInputRef.current.files[0]);

        if (imageShackUri) {
          newItem[0].image_uri = 'https://' + imageShackUri;
        }
      }

      const response = await postGift(newItem[0]);

      if (response) {
        setSelectedGifts((prev: any) => {
          return [...prev.filter((selectedGift: any) => JSON.stringify(selectedGift) !== JSON.stringify({ id: '9999999', name: '', image_uri: '', requested_amount: 0, confirmed_amount: 0 })), ...newItem];
        });
        toast.success(`${newItem[0].name} foi adicionado a sua lista 😁`);
        setModalVisible(false);
        return;
      }

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSelectedModalItem(undefined);
      handleOverlayActive(false);
    }
  }

  async function getGifts(id: string) {
    try {
      const response = await api.get('/gifts', {
        params: {
          giftListId: id
        }
      });

      if (response.status === 200) {
        setSelectedGifts(response.data);
      }
    } catch (error: any) {
      toast.error('Não foi possível obter presentes da sua lista. ' + error.message);
    }

  }

  async function getGiftList() {
    try {
      handleOverlayActive(true);

      const response = await api.get(`/giftLists/${routeParams.id}`);

      if (response.status === 200) {
        setGiftList(response.data);

        getGifts(response.data.id);
        getGiftModels(response.data.list_type_id);
      }

    } catch (error: any) {
      toast.error('Falha ao obter informações da sua lista de presente. ' + error.message);
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
        setExamplesGifts(response.data.map((gift: TGift[]) => ({ ...gift, ...{ gift_list_id: routeParams.id } })));
      }
    } catch (error: any) {
      toast.error('Não foi possível obter exemplos de presentes para sua lista. ' + error.message);
    }
  }

  async function postGift(gift: TGift) {
    try {
      const response = await api.post('/gifts', gift);

      if (response.status === 201) {
        return response.data;
      }
    } catch (error: any) {
      if (error.response.data?.error) {
        toast.error('Não foi possível adicionar presente. ' + error.response.data?.error);
        return;
      }
      toast.error('Não foi possível adicionar presente. ' + error.message);
    }
  }

  async function putGift(gift: TGift) {
    try {
      const response = await api.put(`/gifts/${gift.id}`, gift);

      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      if (error.response.data?.error) {
        toast.error('Não foi possível editar presente. ' + error.response.data?.error);
        return;
      }
      toast.error('Não foi possível editar presente. ' + error.message);
    }
  }

  async function deleteGift(id: string) {
    try {
      if (confirm('Deseja realmente excluir?')) {
        handleOverlayActive(true);
        const response = await api.delete(`/gifts/${id}`);

        if (response.status === 204) {
          setSelectedGifts((prev: any) => prev.filter((selectedGift: any) =>
            JSON.stringify(selectedGift) !== JSON.stringify({ id: '9999999', name: '', image_uri: '', requested_amount: 0, confirmed_amount: 0 }) &&
            (selectedGift.id !== id)
          ));
          toast.success('Presente excluído com sucesso!');
        }
      }
    } catch (error: any) {
      toast.error('Não foi possível excluir presente. ' + error.message);
    } finally {
      handleOverlayActive(false);
    }
  }

  async function handleFileUpload(file: any) {
    try {
      if (!file) return;

      const formData = new FormData();

      formData.append('file', file);
      formData.append('api_key', import.meta.env.VITE_IMAGESHACK_API_KEY);
      formData.append('album', '5D7A9X5A');

      const response = await api.post('http://api.imageshack.com/v2/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 200) return response.data.result.images[0].direct_link

    } catch (error: any) {
      toast.error('Não foi possível salvar imagem. ' + error.message);
    }
  };


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
              height: isMobile ? width < 400 ? '30rem' : '35rem' : '35rem',
              width: isMobile ? '85%' : '30%',
              // margin: 'auto',
              margin: 'auto',
              justifyContent: 'center',
              alignItems: 'center'
            },
          }}
        >
          <ModalContentContainer>
            <h2 style={{ alignSelf: 'center' }}>{selectedModalItem?.name ?? 'Cadastro de Presente'}</h2>
            <br />
            {selectedModalItem?.image_uri && <img src={selectedModalItem.image_uri} alt={selectedModalItem?.name ?? 'Foto do Item Modal'} />}
            <FormContainer onSubmit={(e) => handleSubmit(e, !(!selectedModalItem?.name && !selectedModalItem?.image_uri))}>
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
                    defaultValue={selectedModalItem?.requested_amount ?? ''}
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
                  // onChange={handleFileUpload}
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
    if (selectedGifts.length % 4 !== 0 && !isMobile) {
      const miss = 4 - (selectedGifts.length % 4);

      for (let index = 0; index < miss; index++) {
        selectedGifts.push({ id: '9999999', name: '', image_uri: '', requested_amount: 0, confirmed_amount: 0 });
      }
      setRefresh(prev => !prev);
    }

    // console.log(selectedGiftsMock);

  }, [selectedGifts]);

  useEffect(() => {
    if (examplesGifts.length % 4 !== 0) {
      const miss = 4 - (examplesGifts.length % 4);

      for (let index = 0; index < miss; index++) {
        examplesGifts.push({ id: '9999999', name: '', image_uri: '', requested_amount: 0, confirmed_amount: 0 });
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
        {selectedTab === 1 ? selectedGifts.length > 0 ?
          selectedGifts.map((gift, index) => (
            <GiftCard
              gift={gift}
              key={index}
              setSelectedGiftsMock={setSelectedGifts}
              setModalVisible={setModalVisible}
              setSelectedModalItem={setSelectedModalItem}
              deleteGift={deleteGift}
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
                  setSelectedGiftsMock={setSelectedGifts}
                  setModalVisible={setModalVisible}
                  setSelectedModalItem={setSelectedModalItem}
                  deleteGift={deleteGift}
                />))}
            </GiftsTab2Container>
          </TabContainer>
        }
      </GiftsContainer>
    </Container>
  )
}
