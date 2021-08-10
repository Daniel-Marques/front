import React, { useRef, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useCookies, Cookies } from "react-cookie";
import LoadingScreen from "react-loading-screen";
import { GoogleLogin } from "react-google-login";

import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cookie = new Cookies();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  useEffect(() => {
    const sessionCookie = cookie.get("@newmission:access_token");

    if (!sessionCookie) {
      localStorage.removeItem("@newmission:data");
    } else {
      setTimeout(() => {
        history.push("/users");
      }, 1200);
    }
  }, [cookie, history]);

  const handleSignin = useCallback(
    async (data: ILogin) => {
      try {
        /* Remove all previous errors */
        formRef.current?.setErrors({});
        /* Perform as appropriate validations */
        await userLoginSchema.validate(data, { abortEarly: false });

        /* Validation passed */
        await api
          .post("/auth/token", data)
          .then((response) => {
            const { data } = response;

            if (data) {
              /* Create localStorage */
              localStorage.setItem("@newmission:data", JSON.stringify(data));

              /* Create cookie */
              let expires = new Date();
              expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);
              setCookies("@newmission:access_token", data.access_token, {
                path: "/",
                expires,
              });

              setLoading(true);

              setTimeout(() => {
                /* Redirect for router user */
                history.push("/users");
                setLoading(false);
              }, 5000);
            }
          })
          .catch((err) => {
            toast(`Ooops! ${err.response.data["detail"]}`, {
              position: "top-right",
            });
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
    },
    [history, setCookies]
  );

  const handleSigninGoogle = useCallback(async (data) => {
    const dataPrepare = {
      name: data.profileObj.name,
      email: data.profileObj.email,
    };

    try {
      await api.post("auth/google", dataPrepare).then((response) => {
        const { data } = response;

        const dataSendStorage = {
          user: {
            id: data.id,
            name: data.name,
            email: data.email,
          },
          access_token: data.token,
        };

        if (data) {
          /* Create localStorage */
          localStorage.setItem(
            "@newmission:data",
            JSON.stringify(dataSendStorage)
          );

          /* Create cookie */
          let expires = new Date();
          expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);
          setCookies("@newmission:access_token", data.access_token, {
            path: "/",
            expires,
          });

          setLoading(true);

          setTimeout(() => {
            /* Redirect for router user */
            history.push("/users");
            setLoading(false);
          }, 5000);
        }
      });
    } catch (err) {
      toast.info(`Ooops! ${err.response.data["detail"]}`, {
        position: "top-right",
      });

      setTimeout(() => {
        /* Redirect for router user */
        history.push("/signup");
        setLoading(false);
      }, 5000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LoadingScreen
        loading={loading}
        bgColor="#41bac7"
        spinnerColor="#9ee5f8"
        textColor="#FFFFFF"
        logoSrc="./assets/img/logo.png"
        text="Estou te redirecionando..."
      />

      <ToastContainer transition={Flip} />

      <div className="login-content">
        <div
          className="nk-block toggled"
          id="l-login"
          style={{ minHeight: "80vh" }}
        >
          <img
            src="./assets/img/logo.png"
            alt="Logo"
            className="mb-4"
            style={{ width: 300 }}
          />
          <h2>Olá Visitante</h2>
          <p>Insira seus dados abaixo para acessar:</p>
          <div className="nk-form">
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
                  className="btn btn-login btn-success btn-float"
                >
                  <i className="notika-icon notika-right-arrow right-arrow-ant"></i>
                </button>
              </div>
            </Form>
          </div>

          <div
            className="nk-navigation nk-lg-ic"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <a
              href="/signup"
              data-ma-block="#l-register"
              className="registerHover"
              style={{ marginRight: 5 }}
            >
              <i className="notika-icon notika-plus-symbol"></i>
              <span>Criar conta</span>
            </a>

            <GoogleLogin
              clientId={`${process.env.REACT_APP_CREDENTIALS_GOOGLE}`}
              buttonText="Continuar com o Google"
              onSuccess={handleSigninGoogle}
              onFailure={handleSigninGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
