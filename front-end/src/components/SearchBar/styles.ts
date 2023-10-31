import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  align-items: center;
  align-self: center;
  width: 75%;
  border: 2px solid black;
  border-radius: 10px;
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  padding: 10px 5px;
  width: 90%;
  align-self: center;
  font-weight: bold;
  font-size: 1rem;

  ::placeholder {
    font-weight: bold;
    opacity: 0.8;
    font-size: 1rem;
  }

  :focus {
    outline: none;
  }
`;

export const Button = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  cursor: pointer;
`;
