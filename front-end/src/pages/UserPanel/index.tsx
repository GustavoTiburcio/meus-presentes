import { useState, useContext, useEffect } from 'react';
import IconeDinamico from '../../components/IconeDinamico';
import {
  ButtonOption,
  ButtonsContainer,
  Container, InicioButtonsContainer, ItemMenu,
  ListaPresenteContainer,
  ListaPresenteTitle,
  MenuContainer, MenuInfoContainer, SubContainer,
} from './styles';
import { Button } from '../../components/Presentation/styles';
import { useParams, useNavigate } from 'react-router-dom';
import Context, { IContext } from '../../context/Context';

import { toast } from 'react-toastify';
import api from '../../service/api';
import LoginValidator from '../../components/LoginValidator';

interface IItemsMenu {
  name: string;
  label: string;
  iconName: string;
};

export interface IGiftList {
  id: string;
  name: string;
  list_type_id: string;
  event_date: string;
  expiration_date?: string | null;
  gifts_voltage?: string;
  delivery_address?: string;
  observation?: string;
  user_id: string;
  created_at?: string;
}

export default function UserPanel() {
  const { itemMenuRoute } = useParams();
  const { loginData, loginAuth, handleOverlayActive }: IContext = useContext(Context);
  const navigate = useNavigate();

  const [selectedItemMenu, setSelectedItemMenu] = useState<string>(itemMenuRoute || 'inicio');
  const [giftLists, setGiftLists] = useState<IGiftList[]>([]);

  async function getGiftLists() {
    try {
      if (!loginData?.id) return;

      handleOverlayActive(true);

      const response = await api.get('/giftLists', {
        params: {
          userId: loginData.id
        }
      });

      if (response.status === 200) {
        setGiftLists(response.data);
      }

    } catch (error: any) {
      toast.error('Falha ao obter listas de presentes. ' + error.message);
    } finally {
      handleOverlayActive(false);
    }
  }

  async function giftListWhatsAppShare(url: string) {
    window.open(encodeURI(`https://api.whatsapp.com/send?text=Confira minha lista de presentes!! Acesso em: ${url}`));
  }

  async function deleteGiftList(id: string, name: string) {
    try {
      if (confirm(`Deseja mesmo apagar ${name}?`)) {
        handleOverlayActive(true);

        const response = await api.delete(`/giftLists/${id}`);

        if (response.status === 204) {
          setGiftLists(prev => prev.filter(giftList => giftList.id !== id));
        }
      }

    } catch (error: any) {
      toast.error('Falha ao deletar listas de presentes. ' + error.message);
    } finally {
      handleOverlayActive(false);
    }
  }

  function Menu() {
    const itemsMenu: IItemsMenu[] = [
      { name: 'inicio', label: 'Início', iconName: 'AiOutlineHome' },
      { name: 'minhasListas', label: 'Minhas Listas', iconName: 'AiOutlineGift' },
      { name: 'contaDeUsuario', label: 'Conta de Usuário', iconName: 'FiUser' },
      { name: 'privacidade', label: 'Privacidade', iconName: 'FiLock' },
      { name: 'encerrarSessao', label: 'Encerrar Sessão', iconName: 'FiLogOut' },
    ];

    return (
      <MenuContainer>
        <h2>Menu</h2>
        <br />
        {itemsMenu.map((itemMenu, index) => (
          <ItemMenu
            onClick={() => {
              if (itemMenu.name === 'encerrarSessao') {
                loginAuth({ name: '', email: '', password: '' });
                navigate('/login');
                toast.success('Sessão encerrada');
                return;
              }

              setSelectedItemMenu(itemMenu.name);
              navigate(`/painelDeUsuario/${itemMenu.name}`);
            }}
            key={index}
            $isSelected={itemMenu.name === selectedItemMenu}
          >
            <IconeDinamico nome={itemMenu.iconName} size={25} />
            <span>{itemMenu.label}</span>
          </ItemMenu>
        ))}
      </MenuContainer>
    );
  }

  function MenuInfo() {
    const itemsMenuInfo: Record<string, JSX.Element> = {
      inicio:
        <>
          <h2>Bem-vindo(a) {loginData.name ?? ''}! É aqui onde tudo começa!!</h2>
          <p>Confira os serviços disponíveis no menu à esquerda.</p>
          <>
            <InicioButtonsContainer>
              <Button onClick={() => navigate('/criarLista')}>Criar Lista de Presentes</Button>
              <Button
                onClick={() => {
                  setSelectedItemMenu('minhasListas');
                  navigate('/painelDeUsuario/minhasListas')
                }}
              >Acessar Minhas Listas</Button>
            </InicioButtonsContainer>
          </>
        </>,
      minhasListas:
        <>
          <h2>Minhas listas de presentes</h2>
          <p>Veja suas listas de presente aqui.</p>
          {giftLists.map((list, index) => (
            <ListaPresenteContainer key={index}>
              <ListaPresenteTitle>
                <IconeDinamico nome={'AiOutlineGift'} />
                {`${list.name}`}
              </ListaPresenteTitle>
              <ButtonsContainer>
                <ButtonOption onClick={() => navigate(`/listaDePresente/${list.id}`)}>
                  <IconeDinamico nome='AiOutlineEdit' />
                  Editar Presentes
                </ButtonOption>
                <ButtonOption onClick={() => navigate(`/criarLista/${list.id}`)}>
                  <IconeDinamico nome='AiOutlineEdit' />
                  Editar Informações
                </ButtonOption>
                <ButtonOption>
                  <IconeDinamico nome='AiOutlineFileExcel' />
                  Exportar Planilha
                </ButtonOption>
                <ButtonOption onClick={() => giftListWhatsAppShare(`${window.location.origin}/${list.id}`)}>
                  <IconeDinamico nome='AiOutlineShareAlt' />
                  Compartilhar
                </ButtonOption>
                <ButtonOption onClick={() => deleteGiftList(list.id, list.name)}>
                  <IconeDinamico nome='AiOutlineDelete' />
                  Excluir Lista
                </ButtonOption>
              </ButtonsContainer>
              <b>Endereço da Lista: <a href={`${window.location.origin}/${list.id}`} target='_blank'>{`${window.location.origin}/${list.id}`}</a></b>
            </ListaPresenteContainer>
          ))}
          <Button onClick={() => navigate('/criarLista')}>Criar Nova Lista</Button>
        </>,
      contaDeUsuario: <>Conta de Usuário</>,
      privacidade: <>Privacidade</>,
      encerrarSessao: <>Encerrar Sessão</>,
    }

    return (
      <MenuInfoContainer>
        {itemsMenuInfo[selectedItemMenu || 'inicio']}
      </MenuInfoContainer>
    );
  }

  useEffect(() => {
    getGiftLists();
  }, []);

  return (
    <Container>
      <LoginValidator />
      <SubContainer>
        <Menu />
        <MenuInfo />
      </SubContainer>
    </Container>
  )
}
