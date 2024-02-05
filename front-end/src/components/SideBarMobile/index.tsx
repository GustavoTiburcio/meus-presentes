import { useContext, useState } from 'react';
import { CloseIconDiv, Container } from './styles';
// import { useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Context, { IContext } from '../../context/Context';

interface IMenuOptions {
  option: string;
  suboptions: {
    subOption: string;
    redirect: () => void;
  }[];
  redirect: () => void;
}

export default function SideBarMobile() {
  const { loginData }: IContext = useContext(Context);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleItemClick = (index: number) => setActiveIndex(activeIndex === index ? null : index);

  const MenuOptions: IMenuOptions[] = [
    {
      option: 'Início',
      suboptions: [],
      redirect: () => navigate('/')
    },
    {
      option: 'Como Funciona?',
      suboptions: [],
      redirect: () => navigate('/')
    },
    {
      option: 'Contato',
      suboptions: [],
      redirect: () => navigate('/')
    },
    {
      option: 'Indique',
      suboptions: [],
      redirect: () => navigate('/')
    },
    {
      option: 'Acessar Conta',
      suboptions: [],
      redirect: () => handleLoginButtonClick()
    }
    // {
    //   option: 'Funcionalidades',
    //   suboptions: [
    //     {
    //       subOption: 'Lista 1',
    //         redirect: () => navigate('/')
    //     },
    //     {
    //       subOption: 'Lista 2',
    //          redirect: () => navigate('/')
    //     },
    //     {
    //       subOption: 'Lista 3',
    //          redirect: () => navigate('/')
    //     }
    //   ]
    // }
  ];

  function handleLoginButtonClick() {
    if (loginData.name && loginData.email) {
      navigate('/painelDeUsuario/inicio');
      return;
    }

    navigate('/login');
  }

  return (
    <Container>
      <div onClick={handleToggle}>
        <FaIcons.FaBars size={20} />
      </div>
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <CloseIconDiv onClick={handleToggle}>
          <FaIcons.FaWindowClose size={25} />
        </CloseIconDiv>
        <ul>
          {MenuOptions.map((option: any, index: number) => (
            <li
              key={index}
              className={activeIndex === index ? 'active' : ''}
              onClick={() => {
                // if (option.itemen.length === 0) {
                //   handleToggle();
                //   return;
                // }

                if (option.suboptions.length > 0) {
                  handleItemClick(index);
                  return;
                }

                option.redirect();
              }}
            >
              <b>{option.option}</b>
              {option.suboptions && activeIndex === index && (
                <ul>
                  {option.suboptions.map((subOption: any, index: number) => (
                    <li
                      key={index}
                      onClick={() => {
                        handleToggle();
                      }}
                    >
                      - {subOption.subOption}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
