import styled from 'styled-components/macro';

export const Carousel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.count}00vw;
  height: 100%;
  transform: translateX(-${props => props.current}00vw);
  transition: transform ${props => (props.current === 0 ? '0s ease-in' : '0.35s ease-in-out')};
  background-color: #111111;
`;

export const Image = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  // background-image: url(${props => props.src});
  // background-position: center;
  // background-size: cover;
  h1 {
    color: white;
  }
  p {
    color: white;
  }
`;
export const Video = styled.video`
  width: 100vw;
`;

export const Button = styled.button`
  position: absolute;
  top: 50vh;
  left: ${props => props.name === 'left' && '20px'};
  right: ${props => props.name === 'right' && '20px'};
  background: transparent;
  border: none;
  font-size: 20px;
  color: #f1f1f1;
  &:hover {
    cursor: pointer;
  }
`;
