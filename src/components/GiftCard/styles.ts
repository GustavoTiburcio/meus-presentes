import styled from 'styled-components';
import { InputContainer } from '../../pages/CreateList/styles';

interface IGiftProps {
  hidden?: boolean;
}

export const Gift = styled.div<IGiftProps>`
  display: flex;
  visibility: ${({ hidden }) => hidden ? 'hidden' : 'visible'};
  flex-direction: column;
  width: 24%;
  /* background-color: yellow; */
  font-weight: 500;
  text-transform: capitalize;
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  align-items: center;
  box-shadow: 10px 10px 5px -9px rgba(0,0,0,0.75);
  -webkit-box-shadow: 10px 10px 5px -9px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 5px -9px rgba(0,0,0,0.75);
  background: #f2f2f2;

  img {
    margin-top: 1rem;
    max-height: 100px;
    object-fit: contain;
    align-self: center;
  }
  p {
    max-width: 100%;
  }

  hr {
    /* border-top: 1px solid #D3D3D3; */
    width: 80%;
    margin: 1rem 0px;
  }
  b{
    margin-top: 1rem;
  }
`;

export const ButtonsContainer = styled.div`
  /* margin-top: 1rem; */
  margin-bottom: 1rem;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor:pointer;
  margin-top: 1rem;

  svg {
    font-size: 2rem;
  }

  &:hover{
    color: grey;
  }
`;

export const CustomInputContainer = styled(InputContainer)`
  width: 80%;
  margin: 0rem 0px;

  input{
    padding: 0.3rem;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
