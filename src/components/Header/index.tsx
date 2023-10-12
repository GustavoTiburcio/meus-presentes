import { useState } from 'react';
import { Buttons, Categorias, Container, LogoDiv, Logo, Subcontainer, ModalDiv } from './styles';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import SearchBar from '../SearchBar';
import useWindowDimensions from '../../utils/WindowDimensions';
import SideBarMobile from '../SideBarMobile';

export default function Header() {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;
  const location = useLocation();

  const [modalVisible, setModalVisible] = useState(false);
  const logoURI = 'https://www.confirmeja.com.br/images/logo.png';

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

  return (
    <Container
      hoverHeaderActive={isMobile}
    >
      <PesquisaModal />
      <Subcontainer>
        {isMobile && <SideBarMobile />}
        <LogoDiv>
          <a onClick={() => navigate('/')}>
            <Logo src={logoURI} alt='Logo' />
          </a>
        </LogoDiv>
        {!isMobile &&
          <Categorias hoverHeaderActive={location.pathname === '/'}>
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
                Loteamentos
              </button>
              <div className='dropdown-content'>
                <a>
                  Jardim Dias I
                </a>
                <a>
                  Jardim Dias II
                </a>
                <a>
                  Jardim Tóquio
                </a>
                <a>
                  Paranavaí
                </a>
              </div>
            </div> */}
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
                title='Contato'
              >
                Contato
              </button>
            </div>
            <div className='dropdown'>
              <button
                className='dropbtn'
                title='Acessar conta'
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
          <a onClick={() => { }} title='Login'>
            <FiIcons.FiUser />
          </a>
        </Buttons>
      </Subcontainer>
    </Container>
  );
}