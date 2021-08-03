import React, { useRef, useEffect } from "react";
import ReactInputMask, { Props as InputProps } from "react-input-mask";

import { useField } from "@unform/core";
import { Container } from "./styles";

interface Props extends InputProps {
  name: string;
}

export default function InputMask({ name, ...rest }: Props) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue("");
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} className="form-control" />
      {error && (
        <div className="text-danger" style={{ marginTop: 2 }}>
          {error}
        </div>
      )}
    </Container>
  );
}
