import * as yup from "yup";
import { ptForm } from "yup-locale-pt";

yup.setLocale(ptForm);

export const userEditSchema = yup.object().shape({
  name: yup.string().required("O campo é obrigatório."),
  document: yup
    .string()
    .length(11, "CPF deve conter 11 caracteres")
    .required("O campo é obrigatório."),
  pis: yup.string().required("O campo é obrigatório"),
  email: yup
    .string()
    .email("Informe um e-mail válido")
    .required("O campo é obrigatório"),
  zipcode: yup.string().required("O campo é obrigatório"),
  address: yup.string().required("O campo é obrigatório"),
  number: yup.string(),
  complement: yup.string(),
  city: yup.string().required("O campo é obrigatório"),
  state: yup.string().required("O campo é obrigatório"),
  country: yup.string().required("O campo é obrigatório"),
});
