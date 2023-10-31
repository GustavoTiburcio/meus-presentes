import styled from 'styled-components';

interface HeaderProps {
  $hoverHeaderActive?: boolean;
}

export const Container = styled.div<HeaderProps>`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 999;

  * {
    color: #fff;
  }

  ${({ $hoverHeaderActive }) => {
    if ($hoverHeaderActive) {
      return `div:hover {
        background-color: #FFF;
        * {
        color: #000;
        }
      }
      `;
    } else {
      return `div {
        background-color: #FFF;
        * {
        color: #000;
        }
      }
      box-shadow: 0 4px 8px 0 rgba(171, 183, 183,0.2), 0 3px 10px 0 rgba(171, 183, 183,0.5);
      `;
    }
  }}

  @media screen and (max-width: 767px) {
      * {
        color: #000;
      }
    }
`;

export const Subcontainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 767px) {
    justify-content: space-evenly;
  }
`;

export const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  /* height: 6rem; */
  @media screen and (max-width: 767px) {
    height: 5rem;
    width: 40%;
  }
`;

export const Logo = styled.img`
  cursor: pointer;
  max-height: 5rem;
  @media screen and (max-width: 767px) {
    max-height: 4rem;
  }
`;

export const Categorias = styled.nav<HeaderProps>`
  align-items: center;
  width: 60%;
  flex-wrap: wrap;
  height: 100%;
  display: flex;
  flex-direction: row;
  text-transform: capitalize;
  font-weight: 500;
  color: ${({ $hoverHeaderActive }) => !$hoverHeaderActive ? '#fff' : '#000'};

  .dropdown {
    float: left;
    overflow: hidden;
  }

  .dropdown .dropbtn {
    font-size: 16px;
    border: none;
    outline: none;
    padding: 14px 16px;
    background-color: inherit;
    margin: 0;
    font-size: 1.0rem;
    font-weight: 450;
    text-transform: capitalize;

    .hamburguer-menu{
      margin-top: 5px;
    }
  }

  .navbar a:hover, .dropdown:hover .dropbtn {
    color:red;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #fff;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    overflow-y: auto;
    max-height: 40rem;
  }

  .dropdown-content a {
    float: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
    cursor: pointer;
  }

  .dropdown-content a:hover {
    color: red;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
`;

export const Categoria = styled.p`
  margin-left: 10px;
  margin-right: 10px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
    a {
      font-size: 2rem;
      background: none;
      color: #fff;
      margin: 0px 10px;
      cursor: pointer;
      @media screen and (max-width: 767px) {
        font-size: 1rem;
      }
    }
    a:hover {
      color: #000
    }
`;

export const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
