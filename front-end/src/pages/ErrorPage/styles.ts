import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  text-align: center;

  h1 {
    font-size: 3rem;
  }

  a {
    text-decoration: none;
    color: #fff;
    align-self: center;
  }

  @media screen and (max-width: 767px){
    h1 {
      font-size: 2rem;
    }
  }
`;

export const GifDiv = styled.div`
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height: 400px;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Button = styled.button`
  background-color: #000;
  color: #fff;
  padding: 0px 20px;
  height: 2.5rem;
  border-style: none;
  border-radius: 5px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  margin: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;

  :active {
    opacity: 0.6;
  }
`;
