import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0rem;
  align-items: center;
  @media screen and (max-width: 767px) {
    p {
      text-align: justify;
      width: 90%;
    }
  }
`;

export const FormContainer = styled.form`
  margin: 1rem 0px;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  a {
    margin-top: -1rem;
    cursor: pointer;

    &:hover{
      text-decoration: underline;
    }
  }

  select, input, textarea {
    padding: 0.5rem;
  }

  @media screen and (max-width: 767px) {
    width: 90%;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  div {
    width: 49%;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;

    div {
    width: 100%;
  }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0px;

  select, input, textarea {
    width: 100%;
  }

  label {
    font-weight: 450;
    font-size: 1.2rem;
  }

  p {
    font-size: 0.8rem;
    text-align: justify;
  }

`;
