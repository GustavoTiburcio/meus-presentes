import { useState } from 'react';
import IconeDinamico from '../../components/IconeDinamico';
import {
  Container, InicioButtonsContainer, ItemMenu,
  MenuContainer, MenuInfoContainer, SubContainer,
} from './styles';
import { Button } from '../../components/Presentation/styles';

interface IItemsMenu {
  name: string;
  label: string;
  iconName: string;
};

export default function UserPanel() {
  const [selectedItemMenu, setSelectedItemMenu] = useState<string>('inicio');

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
        {itemsMenu.map((itemMenu, index) => (
          <ItemMenu
            onClick={() => setSelectedItemMenu(itemMenu.name)}
            key={index}
            isSelected={itemMenu.name === selectedItemMenu}
          >
            <IconeDinamico nome={itemMenu.iconName} />
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
      minhasListas: <>Minhas Listas</>,
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
