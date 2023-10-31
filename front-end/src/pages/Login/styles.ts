import styled from 'styled-components';

interface LoginProps {
  login: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
`;

export const Logo = styled.img`
  cursor: pointer;
  margin: 2rem 0px;
`;

export const LoginDiv = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 678px;
  max-width: 100%;
  min-height: 400px;

  @media screen and (max-width: 767px) {
  }
`;

export const CadastroContainer = styled.div<LoginProps>`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${props => props.login !== true ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  `
    : null}
`;


export const LoginContainer = styled.div<LoginProps>`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${props => (props.login !== true ? 'transform: translateX(100%)' : null)}
`;

export const RedefinirPasswordContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: 100%
  }
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
  @media screen and (max-width: 767px) {
    font-size: 1.5rem;
  }
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;

  ::placeholder{
    font-weight: 500;
  }
  @media screen and (max-width: 767px) {
    width: 150%;
  }
`;

export const Button = styled.button`
   border-radius: 20px;
   border: 1px solid #1D1D1D;
   background-color: #1D1D1D;
   color: #ffffff;
   font-size: 12px;
   font-weight: bold;
   padding: 12px 45px;
   letter-spacing: 1px;
   text-transform: uppercase;
   transition: transform 80ms ease-in;
   box-shadow: 0 2px 4px 0 rgba(171, 183, 183,0.2), 0 1.5px 5px 0 rgba(171, 183, 183,0.5);
   &:active{
       transform: scale(0.95);
   }
   &:focus {
       outline: none;
   }
`;

export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
  cursor: pointer;

  :hover{
    color:red
  }
`;

export const OverlayContainer = styled.div<LoginProps>`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${props => props.login !== true ? 'transform: translateX(-100%)' : null}
`;

export const Overlay = styled.div<LoginProps>`
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #1D1D1D, #de344e);
  background: linear-gradient(to right, #1D1D1D, #de344e);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${props => (props.login !== true ? 'transform: translateX(50%)' : null)}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel) <LoginProps>`
  transform: translateX(-20%);
  ${props => props.login !== true ? 'transform: translateX(0);' : null}
`;

export const RightOverlayPanel = styled(OverlayPanel) <LoginProps>`
  right: 0;
  transform: translateX(0);
  ${props => props.login !== true ? 'transform: translateX(20%);' : null}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px
`;
