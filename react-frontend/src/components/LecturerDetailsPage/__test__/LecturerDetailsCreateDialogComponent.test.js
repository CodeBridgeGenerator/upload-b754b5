import React from "react";
import { render, screen } from "@testing-library/react";

import LecturerDetailsCreateDialogComponent from "../LecturerDetailsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders lecturerDetails create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LecturerDetailsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("lecturerDetails-create-dialog-component")).toBeInTheDocument();
});
