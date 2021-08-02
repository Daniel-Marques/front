import React from "react";

const Signin: React.FC = () => {
  return (
    <div className="login-content">
      <div
        className="nk-block toggled"
        id="l-login"
        style={{ minHeight: "80vh" }}
      >
        <img
          src="./assets/img/logo_pontotel.png"
          alt="Logo PontoTel"
          className="mb-4"
          style={{ width: 300 }}
        />
        <h2>Olá Visitante</h2>
        <p>Insira seus dados abaixo para acessar:</p>
        <div className="nk-form mt-5">
          <div className="input-group">
            <span className="input-group-addon nk-ic-st-pro">
              <i className="fa fa-user"></i>
            </span>
            <div className="nk-int-st">
              <input
                type="text"
                className="form-control"
                placeholder="Seu número do PIS"
              />
            </div>
          </div>

          <div className="input-group mg-t-15">
            <span className="input-group-addon nk-ic-st-pro">
              <i className="fa fa-lock"></i>
            </span>
            <div className="nk-int-st">
              <input
                type="password"
                className="form-control"
                placeholder="Sua senha super secreta"
              />
            </div>

            <a
              href="/users"
              data-ma-action="nk-login-switch"
              data-ma-block="#l-register"
              className="btn btn-login btn-success btn-float"
            >
              <i className="notika-icon notika-right-arrow right-arrow-ant"></i>
            </a>
          </div>
        </div>

        <div className="nk-navigation nk-lg-ic">
          <a
            href="#!"
            data-ma-action="nk-login-switch"
            data-ma-block="#l-register"
            style={{ backgroundColor: "#000" }}
          >
            <i className="fa fa-github"></i> <span>GitHub</span>
          </a>

          <a
            href="#!"
            data-ma-action="nk-login-switch"
            data-ma-block="#l-register"
            style={{ backgroundColor: "#DD4C38" }}
          >
            <i className="fa fa-google"></i> <span>Google</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signin;
