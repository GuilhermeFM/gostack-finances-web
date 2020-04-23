import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

interface ContainerProps {
  size?: 'small' | 'large';
}

interface LinkProps {
  highlight: string;
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const NavLink = styled(Link)<LinkProps>`
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  transition: opacity 0.2s;
  padding-bottom: 10px;

  transition: opacity 0.2s;

  ${(props) =>
    props.highlight === 'true'
      ? css`
          border-bottom: 2px solid #ff872c;
        `
      : css`
          border-bottom: 2px solid transparent;
        `}

  & + a {
    margin-left: 32px;
  }

  &:hover {
    opacity: 0.6;
  }
`;
