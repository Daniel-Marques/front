/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useHistory } from "react-router";

import { Link } from "./styles";

const Header: React.FC = () => {
  const history = useHistory();

  function handleLogout() {
    localStorage.removeItem("@newmission:token");
    history.push("/");
  }

  return (
    <div className="header-top-area">
      <div className="container">
        <div className="row">
          <div className="logo-area">
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <div className="logo-area">
                <a href="/users">
                  <img
                    src="./assets/img/logo_pontotel.png"
                    alt="Logo PontoTel"
                    style={{ width: 115 }}
                  />
                </a>
              </div>
            </div>

            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
              <div className="header-top-menu">
                <ul className="nav navbar-nav notika-top-nav">
                  <li className="nav-item">
                    <a href="/profile" title="Meu Perfil" className="nav-link">
                      <span>
                        <img
                          src="./assets/images/user.png"
                          alt="Perfil"
                          style={{ width: 20, color: "white" }}
                        />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link
                      onClick={handleLogout}
                      className="nav-link"
                      title="Sair do Sistema"
                      style={{}}
                    >
                      <span>
                        <img
                          src="./assets/images/logout.png"
                          alt="Sair"
                          style={{ width: 20, color: "white" }}
                        />
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
