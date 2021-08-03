import React, { InputHTMLAttributes, useEffect, useRef } from "react";

import { IconBaseProps } from "react-icons";
import { useField } from "@unform/core";

import { Container } from "./styles";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<IInputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <input
        className="form-control"
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && <div className="text-danger" style={{marginTop: 2}}>{error}</div>}
    </Container>
  );
};

export default Input;
