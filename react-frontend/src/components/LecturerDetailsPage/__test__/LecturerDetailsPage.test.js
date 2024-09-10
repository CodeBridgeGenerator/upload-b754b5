import React from "react";
import { render, screen } from "@testing-library/react";

import LecturerDetailsPage from "../LecturerDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders lecturerDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LecturerDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("lecturerDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("lecturerDetails-add-button")).toBeInTheDocument();
});
