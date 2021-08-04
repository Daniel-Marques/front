import * as yup from "yup";
import { ptForm } from "yup-locale-pt";
import { validateEmail } from "validations-br";

yup.setLocale(ptForm);

export const userLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Informe um e-mail válido")
    .required("O campo é obrigatório")
    .test("is-email", "E-mail inválido", async function (value) {
      const { email } = this.parent;
      if (validateEmail(email) === false) {
        return false;
      }
      return true;
    }),
  password: yup.string().required("O campo é obrigatório"),
});
