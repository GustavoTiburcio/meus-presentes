import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Container, FormContainer, InputContainer, InputWrapper } from './styles';
import { Button } from '../../components/Presentation/styles';

import api from '../../service/api';
import Context, { IContext } from '../../context/Context';

export interface IListTypes {
  id: string;
  name: string;
}

export interface IGiftList {
  id?: string;
  name: string;
  list_type_id: string;
  event_date: string;
  expiration_date?: string;
  gifts_voltage: string;
  delivery_address: string;
  observation: string;
  user_id?: string;
  created_at?: string;
}

export default function CreateList() {
  const routeParams = useParams();
  const navigate = useNavigate();
  const { loginData, handleOverlayActive }: IContext = useContext(Context);

  const [listTypes, setListTypes] = useState<IListTypes[]>([]);
  const [responseData, setResponseData] = useState<any>();

  const listTypeSelectRef = useRef<HTMLSelectElement | null>(null);
  const eventDateInputRef = useRef<HTMLInputElement | null>(null);
  const listNameInputRef = useRef<HTMLInputElement | null>(null);
  const expirationDateInputRef = useRef<HTMLInputElement | null>(null);
  const voltageSelectRef = useRef<HTMLSelectElement | null>(null);
  const deliveryAdressTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const observationTextAreaRef = useRef<HTMLTextAreaElement | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formGiftList: IGiftList = {
      name: listNameInputRef.current?.value ?? '',
      list_type_id: listTypeSelectRef.current?.value ?? '',
      event_date: eventDateInputRef.current?.value ?? new Date().toISOString().split('T')[0],
      gifts_voltage: voltageSelectRef.current?.value ?? '',
      delivery_address: deliveryAdressTextAreaRef.current?.value ?? '',
      observation: observationTextAreaRef.current?.value ?? '',
      user_id: loginData.id,
      ...(expirationDateInputRef.current?.value && { event_date: expirationDateInputRef.current?.value })
    }

    if (!formGiftList.name) {
      toast.warning('Nome da lista inválido');
      return;
    }
    if (!formGiftList.list_type_id) {
      toast.warning('Tipo da lista inválido');
      return;
    }
    if (!formGiftList.event_date) {
      toast.warning('Data do evento inválida');
      return;
    }
    if (!formGiftList.user_id) {
      toast.warning('Faça login para continuar');
      navigate('/login');
      return;
    }

    if (!routeParams?.id) {
      postGiftList(formGiftList);
      return;
    }

    putGiftList(formGiftList);
  }

  async function getGiftListById() {
    try {
      if (!routeParams?.id) {
        return;
      }

      handleOverlayActive(true);

      const response = await api.get(`/giftLists/${routeParams?.id}`);

      if (response.status === 200) {
        setResponseData(response.data);
        listNameInputRef.current!.value = response.data.name;
        //select list type changed to controlled input
        // listTypeSelectRef.current!.value = response.data.list_type_id;
        eventDateInputRef.current!.value = response.data?.event_date ? response.data.event_date.split('T')[0] : '';
        expirationDateInputRef.current!.value = response.data?.expiration_date ? response.data.expiration_date.split('T')[0] : '';
        voltageSelectRef.current!.value = response.data.gifts_voltage;
        deliveryAdressTextAreaRef.current!.value = response.data.delivery_address;
        observationTextAreaRef.current!.value = response.data.observation;
      }

    } catch (error: any) {
      toast.error('Falha ao obter informações da lista de presente. ' + error.message);
    } finally {
      handleOverlayActive(false);
    }
  }

  async function postGiftList(newGiftList: IGiftList) {
    try {
      handleOverlayActive(true);
      const response = await api.post('/giftLists', newGiftList);

      if (response.status === 201) {
        toast.success(`${newGiftList.name} foi cadastrada`);
        navigate('/painelDeUsuario/minhasListas');
      }

    } catch (error: any) {
      toast.error('Falha ao criar lista de presentes');
    } finally {
      handleOverlayActive(false);
    }
  }

  async function putGiftList(editedGiftList: IGiftList) {
    try {
      handleOverlayActive(true);
      const response = await api.put(`/giftLists/${routeParams?.id}`, editedGiftList);

      if (response.status === 200) {
        toast.success(`${editedGiftList.name} foi editada`);
        navigate('/painelDeUsuario/minhasListas');
      }

    } catch (error: any) {
      toast.error('Falha ao editar lista de presentes');
    } finally {
      handleOverlayActive(false);
    }
  }

  async function getListTypes() {
    try {
      const response = await api.get('/listTypes');

      if (response.status === 200) {
        setListTypes(response.data);
      }

    } catch (error: any) {
      toast.error('Falha ao obter tipos de lista de presente');
    }
  }

  useEffect(() => {
    getGiftListById();
    getListTypes();
  }, []);

  return (
    <Container>
      <h2>{routeParams?.id ? 'Editar Informações' : 'Criar Lista de Presente'}</h2>
      <p>{routeParams?.id ? 'Edite as informações dos campos abaixo e clique em salvar' : 'Cadastre a sua lista de presentes no MeusPresentes.com.br'}</p>
      <FormContainer onSubmit={handleSubmit}>
        <InputWrapper>
          <InputContainer>
            <label>Tipo da Lista</label>
            <select
              ref={listTypeSelectRef}
              // defaultValue={''}
              value={responseData?.list_type_id ?? ''}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setResponseData({ list_type_id: e.target.value })
              }}
              required
            >
              <option value={''} disabled hidden> - Escolha - </option>
              {listTypes.map((listType, index) => (
                <option value={listType.id} key={index}>{listType.name}</option>
              ))}
            </select>
          </InputContainer>
          <InputContainer>
            <label>Data do Evento(Comemoração)</label>
            <input
              ref={eventDateInputRef}
              type='date'
              required
              onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => {
                if (new Date(e.target.value) < new Date()) {
                  eventDateInputRef.current!.value = '';
                  toast.warning('Não é permitido informar data retroativa');
                }
              }}
            />
          </InputContainer>
        </InputWrapper>
        <InputWrapper>
          <InputContainer>
            <label>Nome da Lista</label>
            <input
              ref={listNameInputRef}
              type='text'
              required
            />
            <p>Informe aqui o nome dos noivos, aniversariantes ou tema da lista.</p>
          </InputContainer>
          <InputContainer>
            <label>Data de Expiração da Lista</label>
            <input
              ref={expirationDateInputRef}
              type='date'
              onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => {
                if (new Date(e.target.value) < new Date()) {
                  expirationDateInputRef.current!.value = '';
                  toast.warning('Não é permitido informar data retroativa');
                  return;
                }
                if (eventDateInputRef.current?.value) {
                  if (new Date(e.target.value) < new Date(eventDateInputRef.current.value)) {
                    expirationDateInputRef.current!.value = '';
                    toast.warning('Data de expiração não pode ser inferior a data do evento');
                    return;
                  }
                }
              }}
            />
            <p>Para quem prefira que a lista fique ativa por alguns dias após o evento.</p>
          </InputContainer>
        </InputWrapper>
        <InputWrapper>
          <InputContainer>
            <label>Voltagem Padrão dos Presentes</label>
            <select
              ref={voltageSelectRef}
              defaultValue={''}
            >
              <option value={''} disabled hidden> - Escolha - </option>
              <option>220v</option>
              <option>110v</option>
              <option>24v</option>
              <option>12v</option>
            </select>
          </InputContainer>
          <InputContainer>
            <label>Endereço Completo Para Entrega</label>
            <textarea
              ref={deliveryAdressTextAreaRef}
            />
            <p>Informe endereço completo com CEP, complemento ou rua sem abreviar, pois os convidados podem pedir para as lojas entregarem. Caso deseje que entregue na festa, avise por aqui.</p>
          </InputContainer>
        </InputWrapper>
        <InputContainer>
          <label>Aviso para os Convidados</label>
          <textarea
            ref={observationTextAreaRef}
          />
          <p>Coloque algum aviso ou observação caso necessário.</p>
        </InputContainer>
        <Button>{routeParams?.id ? 'Salvar' : 'Criar Lista'}</Button>
        <a onClick={() => navigate(-1)}>Voltar</a>
      </FormContainer>
    </Container>
  )
}
