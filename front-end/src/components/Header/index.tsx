import { useState, useContext } from 'react';
import { Buttons, Categorias, Container, LogoDiv, Logo, Subcontainer, ModalDiv } from './styles';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import SearchBar from '../SearchBar';
import useWindowDimensions from '../../utils/WindowDimensions';
import SideBarMobile from '../SideBarMobile';
import Context, { IContext } from '../../context/Context';

export default function Header() {
  const navigate = useNavigate();
  const { logoUri, loginData }: IContext = useContext(Context);
  const { width } = useWindowDimensions();
  const location = useLocation();

  const isMobile = width <= 767;

  const [modalVisible, setModalVisible] = useState(false);

  function PesquisaModal() {
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
              height: 150,
              width: isMobile ? '80%' : '50%',
              margin: 'auto',
            },
          }}
        >
          <ModalDiv>
            <div style={{ alignSelf: 'flex-end', cursor: 'pointer' }}>
              <AiIcons.AiOutlineClose onClick={() => setModalVisible(false)} size={25} />
            </div>
            <SearchBar placeholder='O que você procura?' setModalVisible={setModalVisible} />
          </ModalDiv>
        </ReactModal>
      </>
    );
  }

  function handleLoginButtonClick() {
    if (loginData.name && loginData.email) {
      navigate('/painelDeUsuario/inicio');
      return;
    }

    navigate('/login');
  }

  return (
    <Container
      $hoverHeaderActive={false}
    >
      <PesquisaModal />
      <Subcontainer>
        {isMobile && <SideBarMobile />}
        <LogoDiv>
          <a onClick={() => navigate('/')}>
            <Logo src={logoUri} alt='Logo' />
          </a>
        </LogoDiv>
        {!isMobile &&
          <Categorias $hoverHeaderActive={location.pathname === '/'}>
            <div className='dropdown'>
              <button
                className='dropbtn'
                title='Início'
              >
                Início
              </button>
            </div>
            <div className='dropdown'>
              <button
                className='dropbtn'
                title='Como Funciona?'
              >
                Como Funciona?
              </button>
            </div>
            {/* <div className='dropdown'>
              <button
                className='dropbtn'
              >
                Funcionalidades
              </button>
              <div className='dropdown-content'>
                <a>
                  Lista 1
                </a>
                <a>
                  Lista 2
                </a>
                <a>
                  Lista 3
                </a>
              </div>
            </div> */}
            <div className='dropdown'>
              <button
                className='dropbtn'
                title='Contato'
              >
                Contato
              </button>
            </div>
            <div className='dropdown'>
              <button
                className='dropbtn'
                title='Indique'
              >
                Indique
              </button>
            </div>
            <div className='dropdown'>
              <button
                className='dropbtn'
                title='Acessar conta'
                onClick={() => handleLoginButtonClick()}
              >
                Acessar conta
              </button>
            </div>
          </Categorias>
        }
        <Buttons>
          <a onClick={() => setModalVisible(true)} title='Pesquisar'>
            <FiIcons.FiSearch />
          </a>
          <a onClick={() => { }} title='Ajuda'>
            <AiIcons.AiOutlineQuestionCircle />
          </a>
          <a onClick={() => handleLoginButtonClick()} title='Login'>
            <FiIcons.FiUser />
          </a>
        </Buttons>
      </Subcontainer>
    </Container>
  );
}
