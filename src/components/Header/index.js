import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.png';

function Header() {
  return (
    <>
      {window.innerWidth < 577 ? (
        <div></div>
      ) : (
        <nav class="header navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src={logoImg} alt="Logo Car CRM" height="40" />
            </Link>

            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/vehicles" className="nav-link">Veículos</Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}

export default Header;
