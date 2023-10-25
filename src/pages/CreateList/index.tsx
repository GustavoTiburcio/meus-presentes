import React from 'react';
import { Container, FormContainer, InputContainer, InputWrapper } from './styles';
import { Button } from '../../components/Presentation/styles';
import { useNavigate } from 'react-router-dom';

export default function CreateList() {
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <Container>
      <h2>Criar Lista de Presente</h2>
      <p>Cadastre a sua lista de presentes no MeusPresentes.com.br</p>
      <FormContainer onSubmit={handleSubmit}>
        <InputWrapper>
          <InputContainer>
            <label>Tipo da Lista</label>
            <select defaultValue={''} required>
              <option value={''} disabled hidden> - Escolha - </option>
              <option>15 Anos</option>
              <option>Aniversário - Comum</option>
              <option>Aniversário - Infantil</option>
              <option>Chá de Bebê</option>
              <option>Chá de Casa Nova</option>
              <option>Chá de Lingerie</option>
              <option>Chá de Panela</option>
              <option>Casamento</option>
              <option>Formatura</option>
              <option>Noivado</option>
              <option>Outra Lista</option>
            </select>
          </InputContainer>
          <InputContainer>
            <label>Data do Evento(Comemoração)</label>
            <input type='date' required/>
          </InputContainer>
        </InputWrapper>
        <InputWrapper>
          <InputContainer>
            <label>Nome da Lista</label>
            <input type='text' required/>
            <p>Informe aqui o nome dos noivos, aniversáriariantes ou tema da lista.</p>
          </InputContainer>
          <InputContainer>
            <label>Data de Expiração da Lista</label>
            <input type='date' />
            <p>Para quem prefira que a lista fique ativa por alguns dias após o evento.</p>
          </InputContainer>
        </InputWrapper>
        <InputWrapper>
          <InputContainer>
            <label>Voltagem Padrão dos Presentes</label>
            <select defaultValue={''}>
              <option value={''} disabled hidden> - Escolha - </option>
              <option>220v</option>
              <option>110v</option>
              <option>24v</option>
              <option>12v</option>
            </select>
          </InputContainer>
          <InputContainer>
            <label>Endereço Completo Para Entrega</label>
            <textarea required/>
            <p>Informe endereço completo com CEP, complemento ou rua sem abreviar, pois os convidados podem pedir para as lojas entregarem. Caso deseje que entregue na festa, avise por aqui.</p>
          </InputContainer>
        </InputWrapper>
        <InputContainer>
          <label>Aviso para os Convidados</label>
          <textarea />
          <p>Coloque algum aviso ou observação caso necessário.</p>
        </InputContainer>
        <Button>Criar Lista</Button>
        <a onClick={() => navigate('/painelDeUsuario')}>Voltar</a>
      </FormContainer>
    </Container>
  )
}
