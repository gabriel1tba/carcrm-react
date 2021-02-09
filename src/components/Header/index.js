import { Link } from 'react-router-dom';
import {
  MenuList,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  FaCar,
  FaUsers,
  FaLaptop,
  FaCreditCard,
  FaWhatsapp,
  FaSignOutAlt,
} from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';

import logoImg from '../../assets/logo.png';

function Header({ title }) {
  return (
    <>
      {window.innerWidth < 577 ? (
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MdMenu />
            </IconButton>
            <Typography variant="h6">{title}</Typography>
          </Toolbar>
        </AppBar>
      ) : (
        <nav class="header navbar navbar-expand-lg navbar-light bg-white p-0">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src={logoImg} alt="Logo Car CRM" height="40" />
            </Link>

            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/vehicles" className="nav-link">
                  <FaCar className="icon-lg mr-1" /> Veículos
                </Link>
              </li>

              <li className="nav-item">
                <button className="nav-link bg-white">
                  <FaUsers className="icon-lg mr-1 " /> Proprietários
                </button>
              </li>

              <li className="nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <FaLaptop className="icon-lg mr-1" /> Site
                </Link>
                <MenuList className="dropdown-menu">
                  <MenuItem className="dropdown-item">
                    Otimização para o Google
                  </MenuItem>
                  <MenuItem className="dropdown-item">
                    Unidades e Telefone
                  </MenuItem>
                  <MenuItem className="dropdown-item">Minha Logo</MenuItem>
                  <MenuItem className="dropdown-item">Domínio</MenuItem>
                  <MenuItem className="dropdown-item">Configurações</MenuItem>
                </MenuList>
              </li>

              <li className="nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <FaCreditCard className="icon-lg mr-1" /> Financeiro
                </Link>
                <MenuList className="dropdown-menu">
                  <MenuItem className="dropdown-item">Plano</MenuItem>
                  <MenuItem className="dropdown-item">
                    Minhas Transações
                  </MenuItem>
                </MenuList>
              </li>

              <li className="nav-item">
                <Link to="#" className="nav-link">
                  <FaWhatsapp className="icon-lg mr-1" /> Ajuda
                </Link>
              </li>

              <li className="nav-item">
                <Link to="#" className="nav-link">
                  <FaSignOutAlt className="icon-lg mr-1" /> Sair
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}

export default Header;
