import React from "react";

import { render, fireEvent, act, waitFor } from "@testing-library/react";
import AxiosMock from "axios-mock-adapter";
import api from "../../services/api";

import Profile from "../../pages/Profile";

const apiMock = new AxiosMock(api);

describe("Profile", () => {
  it("should be able to edit the profile", async () => {

  });
});
