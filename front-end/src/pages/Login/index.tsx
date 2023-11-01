import React, { useEffect, useState, useContext } from 'react';
import {
  Anchor, Button, Container, GhostButton,
  Input, LeftOverlayPanel, Overlay,
  OverlayContainer, Paragraph, RightOverlayPanel,
  LoginContainer, CadastroContainer, Title,
  Form, LoginDiv, Logo, RedefinirPasswordContainer
} from './styles';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Context, { IContext, ILoginData } from '../../context/Context';
import api from '../../service/api';

export default function Login() {
  const navigate = useNavigate();
  const { logoUri, loginAuth }: IContext = useContext(Context);

  const [login, setLogin] = useState(true);
  const [redefinirPassword, setRedefinirPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [novoUsuario, setNovoUsuario] = useState<ILoginData>({ name: '', email: '', password: '' });

  const [randomCadastroFrase, setRandomCadastroFrase] = useState('');
  const [randomLoginFrase, setRandomLoginFrase] = useState('');

  const frases = [
    'Sentiu minha falta né? 🥰',
    'Bom te ver por aqui 😜',
    'Tudo na paz? ✌',
    'Achou o que estava procurando? 👀',
    'É um prazer ter você conosco 💖',
    'Estava te esperando 👀',
    'Que tal uma dose de felicidade hoje? 😃',
    'Você é sempre bem-vindo(a) por aqui! 🤗',
    'Prepare-se para uma experiência incrível! 🌟',
    'Vamos começar com o pé direito? 👣',
    'Seja bem-vindo(a) de volta! 🎉',
    'Está pronto(a) para se surpreender? 🤩',
    'Nós sentimos sua falta! ❤️',
    'Pronto(a) para explorar novidades? 🚀',
  ];

  async function getLogin({ email, password }: ILoginData) {
      if (!email || !password) {
        toast.warning('Credenciais inválidas. Verique os campos digitados.');
        return;
      }

      const response = await loginAuth({email, password});

      if (response) {
        toast.success(`Bem-vindo(a)!! Fique a vontade 😉`);
        navigate('/painelDeUsuario');
        return;
      }
  }

  async function postNewAccount(newAccount: ILoginData) {
    try {
      if (!newAccount.email || !newAccount.password || !newAccount.name) {
        toast.warning('Dados inválidos. Verique os campos digitados.');
        return;
      }

      const response = await api.post('/users', newAccount);

      if (response.status === 201) {
        const responseAuth = await loginAuth(response.data);

        if (responseAuth) {
          toast.success('Usuário cadastrado com sucesso');
          navigate('/painelDeUsuario');
          return;
        }
      }

      throw new Error('Tente novamente');
    } catch (error: any) {
      if (error.response.data?.error === 'This e-mail already in use.') {
        toast.error('Email já utilizado.');
        return;
      }
      if (error.response.data?.error === 'Invalid format for email') {
        toast.error('Email inválido.');
        return;
      }
      toast.error('Falha ao cadastrar novo usuário. ' + error.message);
    }
  }

  async function postPasswordReset(email: string) {
    try {
      if (!email) {
        toast.warning('Email inválido');
        return;
      }
      toast.success('tudo certo');
      setRedefinirPassword(false);

    } catch (error: any) {
      toast.error('Falha ao solicitar redefinição de senha. ' + error.message);
    }
  }

  useEffect(() => {
    setRandomCadastroFrase(frases[(Math.random() * ((frases.length - 1) - 0 + 1)) << 0]);
    setRandomLoginFrase(frases[(Math.random() * ((frases.length - 1) - 0 + 1)) << 0]);
  }, []);

  return (
    <Container>
      <LoginDiv>
        {!redefinirPassword ?
          <>
            <CadastroContainer $login={login}>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  postNewAccount(novoUsuario);
                }}
              >
                <Title>Criar Conta</Title>
                <Input type='text' required placeholder={'Nome Completo'}
                  onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => setNovoUsuario(prev => ({ ...prev, name: e.target.value }))
                  }
                />
                <Input type='email' placeholder='Email' required
                  onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => setNovoUsuario(prev => ({ ...prev, email: e.target.value }))
                  }
                />
                <Input type='password' placeholder='Senha' required
                  onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => setNovoUsuario(prev => ({ ...prev, password: e.target.value }))
                  }
                />
                <Button>Cadastrar</Button>
              </Form>
            </CadastroContainer>
            <LoginContainer $login={login}>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  getLogin({ email, password: password });
                }}
              >
                <Title>Vamos lá</Title>
                <Input type='email' placeholder='Email' value={email} required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <Input type='password' placeholder='Senha' value={password} required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                <Anchor onClick={() => setRedefinirPassword(true)}>Esqueceu sua senha?</Anchor>
                <Button>Acessar</Button>
              </Form>
            </LoginContainer>

            <OverlayContainer $login={login}>
              <Overlay $login={login}>
                <LeftOverlayPanel $login={login}>
                  <Title>Seja Bem-vindo!</Title>
                  <Paragraph>
                    {randomCadastroFrase}
                  </Paragraph>
                  <GhostButton onClick={() => setLogin(true)}>
                    Já tenho cadastro
                  </GhostButton>
                </LeftOverlayPanel>

                <RightOverlayPanel $login={login}>
                  <Title>Bem-vindo de Volta!</Title>
                  <Paragraph>
                    {randomLoginFrase}
                  </Paragraph>
                  <GhostButton onClick={() => setLogin(false)}>
                    Não tenho Conta
                  </GhostButton>
                </RightOverlayPanel>
              </Overlay>
            </OverlayContainer>
          </> :
          <RedefinirPasswordContainer>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                postPasswordReset(email);
              }}
            >
              <Title>Recuperação de conta</Title>
              <Input type='email' placeholder='Digite seu email' value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
              <Button>Enviar email</Button>
              <Anchor onClick={() => setRedefinirPassword(false)}>Acessar conta</Anchor>
            </Form>
          </RedefinirPasswordContainer>
        }
      </LoginDiv>
      {logoUri && <Logo src={logoUri} alt='Logo' onClick={() => navigate('/')} />}
    </Container>
  );
}
