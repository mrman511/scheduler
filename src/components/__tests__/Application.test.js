import React from "react";
import { render, cleanup } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

/*
  A test that renders a React Component
*/
describe("Appointments", () => {
  it("renders without crashing", () => {
    render(<Application />);
  });
})

