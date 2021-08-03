import React from "react";

import { render, fireEvent, act, waitFor } from "@testing-library/react";
import AxiosMock from "axios-mock-adapter";
import api from "../../services/api";

import Users from "../../pages/Users";

const apiMock = new AxiosMock(api);

describe("Users", () => {
  it("should be able to list all the users from your api", async () => {
    apiMock.onGet("users").reply(200, [
      {
        id: 1,
        name: "Daniel da Silva Marques",
        pis: "0021568-9",
        document: "06408268307",
        password: "12345678",
        address: "Rua Maria das Graças da Silva",
        complement: "Casa",
        state: "CE",
        email: "daniel.silva.city@gmail.com",
        zipcode: 62900000,
        number: 222,
        city: "Russas",
        country: "Brasil",
        created_at: "2021-07-30T13:26:22.560376",
        updated_at: null,
      },
    ]);

    const { getByText, getByTestId } = render(<Users />);

    await waitFor(
      () => expect(getByText("Daniel da Silva Marques")).toBeTruthy(),
      { timeout: 200 }
    );

    expect(getByText("Daniel da Silva Marques")).toBeTruthy();
    expect(getByText("daniel.silva.city@gmail.com")).toBeTruthy();
    expect(getByTestId("remove-user-1")).toBeTruthy();
    expect(getByTestId("edit-user-1")).toBeTruthy();
  });

  it("should be able to add a new user", async () => {
    apiMock.onGet("users").reply(200, []);

    const { getByText, getByTestId, getByPlaceholderText } = render(<Users />);

    act(() => {
      fireEvent.click(getByText("Novo usuário"));
    });

    const inputName = getByPlaceholderText("Digite o nome do usuário");
    const inputDocument = getByPlaceholderText("Ex: 000.000.000-00");
    const inputPIS = getByPlaceholderText("Ex: 000.00000.00-0");
    const inputEmail = getByPlaceholderText("Informe aqui o E-mail");
    const inputPassword = getByPlaceholderText("Informe aqui a senha");
    const inputZipcode = getByPlaceholderText("Qual o CEP?");
    const inputAddress = getByPlaceholderText("Endereço");
    const inputNumber = getByPlaceholderText("Ex.: 123 ou S/N");
    const inputComplement = getByPlaceholderText("Ex.: Casa");
    const inputCity = getByPlaceholderText("Ex.: Russas");
    const inputState = getByPlaceholderText("Ex.: CE");
    const inputCountry = getByPlaceholderText("Ex.: Brasil");

    await act(async () => {
      fireEvent.change(inputName, {target: { value: "Victor Sebastião Enzo Silveira" }});
      fireEvent.change(inputDocument, { target: { value: "05087942857" } });
      fireEvent.change(inputPIS, { target: { value: "0023945-9" } });
      fireEvent.change(inputEmail, {target: { value: "victorsebastiaoenzosilveira_@br.pwc.com" }});
      fireEvent.change(inputPassword, { target: { value: "123456789" } });
      fireEvent.change(inputZipcode, { target: { value: "62900000" } });
      fireEvent.change(inputAddress, { target: { value: "Rua Altônia" } });
      fireEvent.change(inputNumber, { target: { value: "234" } });
      fireEvent.change(inputComplement, { target: { value: "Casa" } });
      fireEvent.change(inputCity, { target: { value: "Russas" } });
      fireEvent.change(inputState, { target: { value: "CE" } });
      fireEvent.change(inputCountry, { target: { value: "Brasil" } });
    });

    expect(inputName.value).toBe("Victor Sebastião Enzo Silveira");
    expect(inputDocument.value).toBe("05087942857");
    expect(inputPIS.value).toBe("0023945-9");
    expect(inputEmail.value).toBe("victorsebastiaoenzosilveira_@br.pwc.com");
    expect(inputPassword.value).toBe("123456789");
    expect(inputZipcode.value).toBe("62900000");
    expect(inputAddress.value).toBe("Rua Altônia");
    expect(inputNumber.value).toBe("234");
    expect(inputComplement.value).toBe("Casa");
    expect(inputCity.value).toBe("Russas");
    expect(inputState.value).toBe("CE");
    expect(inputCountry.value).toBe("Brasil");

    apiMock.onPost("users").reply(200, {
      id: 1,
      name: "Victor Sebastião Enzo Silveira",
      document: "05087942857",
      pis: "0023945-9",
      email: "victorsebastiaoenzosilveira_@br.pwc.com",
      password: "12345678",
      zipcode: "02817040",
      address: "Rua Altônia",
      number: 234,
      complement: "Casa",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    });

    await act(async () => {
      fireEvent.click(getByTestId("add-user-button"));
    });

    expect(getByText("Victor Sebastião Enzo Silveira")).toBeTruthy();

    expect(getByTestId("remove-user-1")).toBeTruthy();
    expect(getByTestId("edit-user-1")).toBeTruthy();
  });

  it("should be able to edit a user", async () => {
    apiMock.onGet("users").reply(200, [
      {
        id: 1,
        name: "Daniel da Silva Marques",
        pis: "0021568-9",
        document: "06408268307",
        password: "12345678",
        address: "Rua Maria das Graças da Silva",
        complement: "Casa",
        state: "CE",
        created_at: "2021-07-30T13:26:22.560376",
        email: "daniel.silva.city@gmail.com",
        zipcode: 62900000,
        number: 222,
        city: "Russas",
        country: "Brasil",
        updated_at: null,
      },
    ]);

    const { getByText, getByTestId, getByPlaceholderText } = render(<Users />);

    await waitFor(
      () => expect(getByText("Daniel da Silva Marques")).toBeTruthy(),
      { timeout: 200 }
    );

    expect(getByTestId("remove-user-1")).toBeTruthy();
    expect(getByTestId("edit-user-1")).toBeTruthy();

    act(() => {
      fireEvent.click(getByTestId("edit-user-1"));
    });

    const inputName = getByPlaceholderText("Digite o nome do usuário");

    await act(async () => {
      fireEvent.change(inputName, { target: { value: "Erica" } });
    });

    expect(inputName.value).toBe("Erica");

    apiMock.onPut("users/1").reply(200, {
      id: 1,
      name: "Erica",
      document: "78924656789",
      pis: "0023945-9",
      email: "ericarodrigues@gmail.com",
      password: "12345678",
      zipcode: "02817040",
      address: "Rua Altônia",
      number: 234,
      complement: "Casa",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    });

    await act(async () => {
      fireEvent.click(getByTestId("edit-user-button"));
    });

    await waitFor(() => expect(getByText("Erica")).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText("Erica")).toBeTruthy();

    expect(getByTestId("remove-user-1")).toBeTruthy();
    expect(getByTestId("edit-user-1")).toBeTruthy();
  });

  it("should be able to remove a user", async () => {
    apiMock.onGet("users").reply(200, [
      {
        id: 1,
        name: "Daniel da Silva Marques",
        pis: "0021568-9",
        document: "06408268307",
        password: "12345678",
        address: "Rua Maria das Graças da Silva",
        complement: "Casa",
        state: "CE",
        created_at: "2021-07-30T13:26:22.560376",
        email: "daniel.silva.city@gmail.com",
        zipcode: 62900000,
        number: 222,
        city: "Russas",
        country: "Brasil",
        updated_at: null,
      },
    ]);

    // HTTP: 204 => Successful and doesn't need to leave the page
    apiMock.onDelete("users/1").reply(204);

    const { getByText, getByTestId } = render(<Users />);

    await waitFor(
      () => expect(getByText("Daniel da Silva Marques")).toBeTruthy(),
      { timeout: 200 }
    );

    expect(getByTestId("remove-user-1")).toBeTruthy();
    expect(getByTestId("edit-user-1")).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByTestId("remove-user-1"));
    });

    expect(getByTestId("user-list")).toBeEmptyDOMElement();
  });
});
