import React from "react";

import { render, fireEvent, act } from "@testing-library/react";
import AxiosMock from "axios-mock-adapter";
import api from "../../services/api";

import Profile from "../../pages/Profile";

const apiMock = new AxiosMock(api);
const mockSessionStorage = {
  user: {
    id: 1,
    name: "Daniel Marques",
    email: "daniel.silva.city@gmail.com",
  },
  access_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYW5pZWwuc2lsdmEuY2l0eUBnbWFpbC5jb20iLCJleHAiOjE2MjgyODMxMzZ9.W4dUlzowHF777RGyseqGVaWUG8YVSFl6W-XjMi-tG0I",
};

describe("Profile", () => {
  it("should be able to edit the profile", async () => {
    apiMock
      .onGet(`users/${mockSessionStorage.user.id}`, {
        headers: { Authorization: `Bearer ${mockSessionStorage.access_token}` },
      })
      .reply(200, [
        {
          id: 1,
          name: "Daniel da Silva Marques",
          pis: "13319226648",
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
        },
      ]);

    const { getByTestId, getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText("Digite o nome do usuário");
    const inputDocument = getByPlaceholderText("Ex: 000.000.000-00");
    const inputPIS = getByPlaceholderText("Ex: 000.00000.00-0");
    const inputEmail = getByPlaceholderText("Informe aqui o E-mail");
    const inputZipcode = getByPlaceholderText("Qual o CEP?");
    const inputAddress = getByPlaceholderText("Endereço");
    const inputNumber = getByPlaceholderText("Ex.: 123 ou S/N");
    const inputComplement = getByPlaceholderText("Ex.: Casa");
    const inputCity = getByPlaceholderText("Ex.: Russas");
    const inputState = getByPlaceholderText("Ex.: CE");
    const inputCountry = getByPlaceholderText("Ex.: Brasil");

    await act(async () => {
      fireEvent.change(inputName, {
        target: { value: "Daniel da Silva Marques" },
      });
      fireEvent.change(inputDocument, { target: { value: "064.082.683-07" } });
      fireEvent.change(inputPIS, { target: { value: "133.19226.64-8" } });
      fireEvent.change(inputEmail, {
        target: { value: "daniel.silva.city@.com" },
      });
      fireEvent.change(inputZipcode, { target: { value: "62900000" } });
      fireEvent.change(inputAddress, {
        target: { value: "Rua Maria das Graças da Silva" },
      });
      fireEvent.change(inputNumber, { target: { value: "222" } });
      fireEvent.change(inputComplement, { target: { value: "Casa" } });
      fireEvent.change(inputCity, { target: { value: "Russas" } });
      fireEvent.change(inputState, { target: { value: "CE" } });
      fireEvent.change(inputCountry, { target: { value: "Brasil" } });
    });

    await act(async () => {
      fireEvent.change(inputZipcode, { target: { value: "60135410" } });
      fireEvent.change(inputAddress, {
        target: { value: "Rua Dom Expedito Lopes" },
      });
      fireEvent.change(inputNumber, { target: { value: "2577" } });
      fireEvent.change(inputComplement, { target: { value: "Apto 701" } });
      fireEvent.change(inputCity, { target: { value: "Fortaleza" } });
    });

    expect(inputZipcode.value).toBe("60135410");
    expect(inputAddress.value).toBe("Rua Dom Expedito Lopes");
    expect(inputNumber.value).toBe("2577");
    expect(inputComplement.value).toBe("Apto 701");
    expect(inputCity.value).toBe("Fortaleza");

    expect(getByTestId("edit-profile-button")).toBeTruthy();
    expect(getByTestId("remove-profile-button")).toBeTruthy();

    apiMock.onPut("users/1").reply(
      200,
      {
        id: 1,
        name: "Daniel da Silva Marques",
        pis: "13319226648",
        document: "06408268307",
        email: "daniel.silva.city@gmail.com",
        password: "12345678",
        zipcode: 60135410,
        address: "Rua Maria das Graças da Silva",
        number: 2577,
        complement: "Casa",
        city: "Fortaleza",
        state: "CE",
        country: "Brasil",
      },
      {
        Authorization: `Bearer ${mockSessionStorage.access_token}`,
      }
    );

    await act(async () => {
      fireEvent.click(getByTestId("edit-profile-button"));
    });

    expect(inputZipcode.value).toBe("60135410");
    expect(inputAddress.value).toBe("Rua Dom Expedito Lopes");
    expect(inputNumber.value).toBe("2577");
    expect(inputComplement.value).toBe("Apto 701");
    expect(inputCity.value).toBe("Fortaleza");
  });

  it("should be to able to remove current user", async () => {
    apiMock
      .onGet("users", {
        headers: { Authorization: `Bearer ${mockSessionStorage.access_token}` },
      })
      .reply(200, [
        {
          id: 1,
          name: "Daniel da Silva Marques",
          pis: "13319226648",
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

    const { getByTestId, getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText("Digite o nome do usuário");
    const inputDocument = getByPlaceholderText("Ex: 000.000.000-00");
    const inputPIS = getByPlaceholderText("Ex: 000.00000.00-0");
    const inputEmail = getByPlaceholderText("Informe aqui o E-mail");
    const inputZipcode = getByPlaceholderText("Qual o CEP?");
    const inputAddress = getByPlaceholderText("Endereço");
    const inputNumber = getByPlaceholderText("Ex.: 123 ou S/N");
    const inputComplement = getByPlaceholderText("Ex.: Casa");
    const inputCity = getByPlaceholderText("Ex.: Russas");
    const inputState = getByPlaceholderText("Ex.: CE");
    const inputCountry = getByPlaceholderText("Ex.: Brasil");

    await act(async () => {
      fireEvent.change(inputName, {
        target: { value: "Daniel da Silva Marques" },
      });
      fireEvent.change(inputDocument, { target: { value: "064.082.683-07" } });
      fireEvent.change(inputPIS, { target: { value: "133.19226.64-8" } });
      fireEvent.change(inputEmail, {
        target: { value: "daniel.silva.city@.com" },
      });
      fireEvent.change(inputZipcode, { target: { value: "62900000" } });
      fireEvent.change(inputAddress, {
        target: { value: "Rua Maria das Graças da Silva" },
      });
      fireEvent.change(inputNumber, { target: { value: "222" } });
      fireEvent.change(inputComplement, { target: { value: "Casa" } });
      fireEvent.change(inputCity, { target: { value: "Russas" } });
      fireEvent.change(inputState, { target: { value: "CE" } });
      fireEvent.change(inputCountry, { target: { value: "Brasil" } });
    });

    await apiMock
      .onDelete(`users/${mockSessionStorage.user.id}`,)
      .reply(200, [], {
        Authorization: `Bearer ${mockSessionStorage.access_token}`,
      });

    expect(getByTestId("remove-profile-button")).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByTestId("remove-profile-button"));
    });
  });
});
