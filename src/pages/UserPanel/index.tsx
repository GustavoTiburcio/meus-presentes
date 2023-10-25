import { useState } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';

interface IItemsMenu {
  name: string;
  label: string;
  iconName: string;
};

export default function UserPanel() {
  const { itemMenuRoute } = useParams();

  const Navigate = useNavigate();
  const [selectedItemMenu, setSelectedItemMenu] = useState<string>(itemMenuRoute || 'inicio');

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
              setSelectedItemMenu(itemMenu.name);
              Navigate(`/painelDeUsuario/${itemMenu.name}`);
            }}
            key={index}
            isSelected={itemMenu.name === selectedItemMenu}
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
          <h2>Saudações, é aqui onde tudo começa!!</h2>
          <p>Confira os serviços disponíveis no menu à esquerda.</p>
          <>
            <InicioButtonsContainer>
              <Button>Criar Lista de Presentes</Button>
              <Button>Acessar Minhas Listas</Button>
            </InicioButtonsContainer>
          </>
        </>,
      minhasListas:
        <>
          <h2>Minhas listas de presentes</h2>
          <p>Veja suas listas de presente aqui.</p>
          <ListaPresenteContainer>
            <ListaPresenteTitle>
              <IconeDinamico nome={'AiOutlineGift'} />
              770756 - Chá de Casa Nova Gustavo
            </ListaPresenteTitle>
            <ButtonsContainer>
              <ButtonOption>
                <IconeDinamico nome='AiOutlineEdit' />
                Editar Presentes
              </ButtonOption>
              <ButtonOption>
                <IconeDinamico nome='AiOutlineEdit' />
                Editar Informações
              </ButtonOption>
              <ButtonOption>
                <IconeDinamico nome='AiOutlineFileExcel' />
                Exportar p/ Excel
              </ButtonOption>
              <ButtonOption>
                <IconeDinamico nome='AiOutlineShareAlt' />
                Como Divulgar?
              </ButtonOption>
              <ButtonOption>
                <IconeDinamico nome='AiOutlineDelete' />
                Excluir Lista
              </ButtonOption>
            </ButtonsContainer>
            <b>Endereço da Lista: <a href={window.location.origin + '/770756'} target='_blank'>{window.location.origin + '/770756'}</a></b>
          </ListaPresenteContainer>
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
