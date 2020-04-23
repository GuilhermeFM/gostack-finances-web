import React from 'react';
import { useLocation } from 'react-router-dom';

import { Container, NavLink } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const { pathname } = useLocation();

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <NavLink highlight={(pathname === '/').toString()} to="/">
            Listagem
          </NavLink>
          <NavLink highlight={(pathname === '/import').toString()} to="/import">
            Importar
          </NavLink>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
