import { useState } from 'react';
import { CloseIconDiv, Container } from './styles';
// import { useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';

export default function SideBarMobile() {
  // const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleItemClick = (index: number) => setActiveIndex(activeIndex === index ? null : index);

  const itensMenu = [
    {
      cod: '1',
      itemen: 'Loteamentos',
      subitemen: [
        {
          codsubitemen: '1',
          subitemen: 'Jardim Dias I'
        },
        {
          codsubitemen: '2',
          subitemen: 'Jardim Dias II'
        },
        {
          codsubitemen: '3',
          subitemen: 'Jardim Tóquio'
        },
        {
          codsubitemen: '4',
          subitemen: 'Paranavaí'
        },
      ],
    }
  ]

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
          <li onClick={() => handleItemClick(9999)} className={activeIndex === 9999 ? 'active' : ''}>
            <b>Início</b>
          </li>
          <li onClick={() => handleItemClick(9999)} className={activeIndex === 9999 ? 'active' : ''}>
            <b>Quem somos</b>
          </li>

          {itensMenu.map((itemMenu: any, index) => (
            <li
              key={index}
              className={activeIndex === index ? 'active' : ''}
              onClick={() => {
                if (itemMenu.itemen.length === 0) {
                  handleToggle();
                  return;
                }
                handleItemClick(index);
              }}
            >
              <b>{itemMenu.itemen}</b>
              {itemMenu.subitemen && activeIndex === index && (
                <ul>
                  {itemMenu.subitemen.map((subitemen: any, index: any) => (
                    <li
                      key={index}
                      onClick={() => {
                        handleToggle();
                      }}
                    >
                      - {subitemen.subitemen}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li onClick={() => handleItemClick(9999)} className={activeIndex === 9999 ? 'active' : ''}>
            <b>Lançamentos</b>
          </li>
          <li onClick={() => handleItemClick(9999)} className={activeIndex === 9999 ? 'active' : ''}>
            <b>Contato</b>
          </li>
          <li onClick={() => handleItemClick(9999)} className={activeIndex === 9999 ? 'active' : ''}>
            <b>Área do Cliente</b>
          </li>
        </ul>
      </nav>
    </Container>
  );
}
