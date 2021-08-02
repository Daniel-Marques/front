import React from "react";

interface ButtonProps {
  openModal: () => void;
}

const ButtonAddUser: React.FC<ButtonProps> = ({ openModal }) => {
  return (
    <button type="button" className="btn btn-primary" onClick={openModal}>
      Novo usuário
    </button>
  );
};

export default ButtonAddUser;
