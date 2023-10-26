import { useState, useContext } from 'react';
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

interface IItemsMenu {
  name: string;
  label: string;
  iconName: string;
};

interface IList {
  id: number;
  name: string;
}

export default function UserPanel() {
  const { itemMenuRoute } = useParams();
  const { loginData, saveLoginData }: IContext = useContext(Context);
  const navigate = useNavigate();

  const [selectedItemMenu, setSelectedItemMenu] = useState<string>(itemMenuRoute || 'inicio');

  const listsMock: IList[] = [
    { id: 770756, name: 'Chá de Casa Nova Gustavo' },
  ];

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
                saveLoginData({ name: '', email: '', password: '' });
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
          {listsMock.map((list, index) => (
            <ListaPresenteContainer key={index}>
              <ListaPresenteTitle>
                <IconeDinamico nome={'AiOutlineGift'} />
                {`${list.id} - ${list.name}`}
              </ListaPresenteTitle>
              <ButtonsContainer>
                <ButtonOption onClick={() => navigate(`/listaDePresente/${list.id}`, { state: { name: list.name } })}>
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
                <ButtonOption>
                  <IconeDinamico nome='AiOutlineShareAlt' />
                  Compartilhar
                </ButtonOption>
                <ButtonOption>
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

  return (
    <Container>
      {/* <Title /> */}
      <br />
      <br />
      <br />
      <SubContainer>
        <Menu />
        <MenuInfo />
      </SubContainer>
    </Container>
  )
}
