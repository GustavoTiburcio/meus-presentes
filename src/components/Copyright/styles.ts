import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  background-color: #1D1D1D;
  bottom: 0;
  position: absolute;
  z-index: 999;
  color: #fff;

  span {
    color: red;
    margin: 0px 5px;
  }

  a {
    text-indent: 5px;
    text-decoration: none;
    color: #fff;
  }

  a:hover{
    color: cyan;
  }

  @media screen and (max-width: 767px){
    font-size: 0.7rem;
  }
`;
