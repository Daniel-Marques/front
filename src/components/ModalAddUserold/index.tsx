import React, { useRef, useCallback } from "react";

import { FormHandles } from "@unform/core";
import * as yup from "yup";
import { userSchema } from "../../validations/UserValidation";

import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";

interface IUser {
  id: number;
  name: string;
  document: string;
  pis: string;
  email: string;
  password: string;
  zipcode: number;
  address: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  country: string;
}

interface ICreateUserData {
  id: number;
  name: string;
  document: string;
  pis: string;
  email: string;
  password: string;
  zipcode: number;
  address: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  country: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddUser: (
    user: Omit<IUser, "id" | "created_at" | "updated_at">
  ) => void;
}

interface Errors {
  [key: string]: string;
}

const ModalAddUser: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddUser,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmitForm = useCallback(
    async (data: ICreateUserData) => {
      try {
        // Remove all previous errors
        formRef.current?.setErrors({});

        await userSchema.validate(data, { abortEarly: false });
        // Validation passed
        console.log(data);
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
    [handleAddUser, setIsOpen]
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <h3>Novo usuário</h3>
        <div className="row">
          <div className="col-lg-12 mb-3">
            <label>Nome do Usuário</label>
            <Input
              type="text"
              name="name"
              placeholder="Digite o nome do usuário"
            />
          </div>

          <div className="col-lg-6 mb-3">
            <label>CPF</label>
            <Input name="document" placeholder="Ex: 000.000.000-00" />
          </div>

          <div className="col-12">
            <button
              type="submit"
              className="btn btn-labeled btn-success"
              data-testid="add-user-button"
              style={{ marginLeft: 12, borderRadius: 3, height: 40 }}
            >
              <span className="btn-label" style={{ height: 40 }}>
                <i className="fa fa-check"></i>
              </span>
              Adicionar usuário
            </button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalAddUser;
