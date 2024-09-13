import styled from 'styled-components';

export const Container = styled.div`
  background-color: #000000;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 678px;
  max-width: 100%;
  min-height: 400px;
`;

export const SignUpContainer = styled.div<{ signinIn: boolean }>`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${props => !props.signinIn ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  ` : null}
`;

export const SignInContainer = styled.div<{ signinIn: boolean }>`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${props => !props.signinIn ? `transform: translateX(100%);` : null}
`;

export const Form = styled.form`
  background-color: #000000;
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
  color: #f0b3ff; // Lighter shade of pink
  text-shadow: 
    -1px -1px 0 #8b5cf6, // Purple outline
    1px -1px 0 #8b5cf6,
    -1px 1px 0 #8b5cf6,
    1px 1px 0 #8b5cf6,
    0 0 10px #e879f9; // Glow effect
  font-size: 3rem; // Adjust size as needed
  letter-spacing: 2px;
`;


export const Input = styled.input`
  background-color: #1a1625;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  color: #fff;
`;


export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #8b5cf6;
  background-color: #8b5cf6;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
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
  color: #e879f9;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

export const OverlayContainer = styled.div<{ signinIn: boolean }>`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${props => !props.signinIn ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div<{ signinIn: boolean }>`
  background: #8b5cf6;
  background: -webkit-linear-gradient(to right, #8b5cf6, #e879f9);
  background: linear-gradient(to right, #8b5cf6, #e879f9);
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
  ${props => !props.signinIn ? `transform: translateX(50%);` : null}
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

export const LeftOverlayPanel = styled(OverlayPanel)<{ signinIn: boolean }>`
  transform: translateX(-20%);
  ${props => !props.signinIn ? `transform: translateX(0);` : null}
`;

export const RightOverlayPanel = styled(OverlayPanel)<{ signinIn: boolean }>`
  right: 0;
  transform: translateX(0);
  ${props => !props.signinIn ? `transform: translateX(20%);` : null}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;