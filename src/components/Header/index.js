/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import {
  MenuList,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from '@material-ui/core';
import {
  FaCar,
  FaUsers,
  FaLaptop,
  FaCreditCard,
  FaWhatsapp,
  FaSignOutAlt,
  FaAngleUp,
  FaAngleDown,
} from 'react-icons/fa';

import logoImg from '../../assets/logo.png';

import { index } from '../../store/actions/app';
import { toggleScreen1 } from '../../store/actions/navigation';

const Header = ({ title, button }) => {
  const dispatch = useDispatch();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCollapseSite, setOpenCollapseSite] = useState(false);
  const [openCollapseFinancial, setOpenCollapseFinancial] = useState(false);

  const openNavigationOwoners = (page) => {
    dispatch(
      toggleScreen1({
        open: true,
        type: page,
        props: {},
      })
    );

    setOpenDrawer(false);
  };

  useEffect(() => {
    dispatch(index());
  }, []);

  return (
    <>
      <AppBar position="fixed" className="d-lg-none">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenDrawer(true)}
          >
            <MdMenu />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
          {button && button}
        </Toolbar>
      </AppBar>

      <nav className="header navbar navbar-expand-lg navbar-light bg-white p-0 d-none d-lg-block">
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
              <button
                onClick={() => openNavigationOwoners('owners')}
                className="nav-link bg-white"
              >
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
                <MenuItem
                  onClick={() => openNavigationOwoners('seo')}
                  className="dropdown-item"
                >
                  Otimização para o Google
                </MenuItem>
                <MenuItem
                  onClick={() => openNavigationOwoners('units')}
                  className="dropdown-item"
                >
                  Unidades e Telefone
                </MenuItem>
                <MenuItem
                  onClick={() => openNavigationOwoners('logo')}
                  className="dropdown-item"
                >
                  Minha Logo
                </MenuItem>
                <MenuItem
                  onClick={() => openNavigationOwoners('domain')}
                  className="dropdown-item"
                >
                  Domínio
                </MenuItem>
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
                <MenuItem className="dropdown-item">Minhas Transações</MenuItem>
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

      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div style={{ width: 320, maxWidth: window.innerWidth - 70 }}>
          <List component="nav" className="menu-mobile">
            <ListItem>
              <img
                className="img-fluid logo-mobile"
                src={logoImg}
                alt="Logo Car CRM"
                height="40"
              />
            </ListItem>
            <ListItem>
              <p>gabriel.ferreira.itba@gmail.com</p>
            </ListItem>

            <Divider className="mt-2 mb-3" />

            <ListItem
              component={Link}
              to="/vehicles"
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemIcon>
                <FaCar />
              </ListItemIcon>
              <ListItemText primary="Veículos" />
            </ListItem>

            <ListItem onClick={() => openNavigationOwoners('owners')}>
              <ListItemIcon>
                <FaUsers />
              </ListItemIcon>
              <ListItemText primary="Proprietários" />
            </ListItem>

            <ListItem
              button
              onClick={() => setOpenCollapseSite((prev) => !prev)}
            >
              <ListItemIcon>
                <FaLaptop />
              </ListItemIcon>
              <ListItemText primary="Site" />
              {openCollapseSite ? <FaAngleUp /> : <FaAngleDown />}
            </ListItem>

            <Collapse in={openCollapseSite} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem onClick={() => openNavigationOwoners('seo')}>
                  <ListItemText
                    className="pl-5"
                    primary="Otimização para o Google"
                  />
                </ListItem>
                <ListItem onClick={() => openNavigationOwoners('owners')}>
                  <ListItemText
                    className="pl-5"
                    primary="Unidades e Telefones"
                  />
                </ListItem>
                <ListItem onClick={() => openNavigationOwoners('logo')}>
                  <ListItemText className="pl-5" primary="Minha Logo" />
                </ListItem>
                <ListItem onClick={() => openNavigationOwoners('domain')}>
                  <ListItemText className="pl-5" primary="Domínio" />
                </ListItem>

                <ListItem>
                  <ListItemText className="pl-5" primary="Configurações" />
                </ListItem>
              </List>
            </Collapse>

            <Divider className="mt-2 mb-2" />

            <ListItem
              button
              onClick={() => setOpenCollapseFinancial((prev) => !prev)}
            >
              <ListItemIcon>
                <FaCreditCard />
              </ListItemIcon>
              <ListItemText primary="Financeiro" />
              {openCollapseFinancial ? <FaAngleUp /> : <FaAngleDown />}
            </ListItem>

            <Collapse in={openCollapseFinancial} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText className="pl-5" primary="Meu Plano" />
                </ListItem>

                <ListItem>
                  <ListItemText className="pl-5" primary="Minhas Transações" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem>
              <ListItemIcon>
                <FaWhatsapp />
              </ListItemIcon>
              <ListItemText primary="Ajuda" />
            </ListItem>

            <Divider className="mt-2 mb-2" />

            <ListItem>
              <ListItemIcon>
                <FaSignOutAlt />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
