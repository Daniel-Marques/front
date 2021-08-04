import React, { useRef, useCallback } from "react";
import { useHistory } from "react-router";
import api from "../../services/api";

import { FormHandles } from "@unform/core";
import InputSignin from "../../components/InputSignin";

import { Form } from "./styles";
import * as yup from "yup";
import { userLoginSchema } from "../../validations/UserLoginValidation";

interface Errors {
  [key: string]: string;
}
interface ILogin {
  email: String;
  password: String;
}

const Signin: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSignin = useCallback(async (data: ILogin) => {
    try {
      // Remove all previous errors
      formRef.current?.setErrors({});
      await userLoginSchema.validate(data, { abortEarly: false });

      // Validation passed
      await api.post("/auth/token", data).then((response) => {
        const { data } = response;

        if (data) {
          localStorage.setItem("@newmission:token", JSON.stringify(data));
          history.push("/users");
        }
      });
    } catch (err) {
      const validationErrors: Errors = {};

      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path!] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      }
    }
  }, []);

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
          <Form ref={formRef} onSubmit={handleSignin}>
            <div className="input-group">
              <span className="input-group-addon nk-ic-st-pro">
                <i className="fa fa-user"></i>
              </span>
              <div className="nk-int-st">
                <InputSignin
                  type="text"
                  name="email"
                  placeholder="Seu e-mail"
                />
              </div>
            </div>

            <div className="input-group mg-t-15">
              <span className="input-group-addon nk-ic-st-pro">
                <i className="fa fa-lock"></i>
              </span>
              <div className="nk-int-st">
                <InputSignin
                  type="password"
                  name="password"
                  placeholder="Sua senha super secreta"
                />
              </div>

              <button
                type="submit"
                data-ma-action="nk-login-switch"
                data-ma-block="#l-register"
                className="btn btn-login btn-success btn-float"
              >
                <i className="notika-icon notika-right-arrow right-arrow-ant"></i>
              </button>
            </div>
          </Form>
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
