import React from "react";
import { render, screen } from "@testing-library/react";

import LecturerDetailsEditDialogComponent from "../LecturerDetailsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders lecturerDetails edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LecturerDetailsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("lecturerDetails-edit-dialog-component")).toBeInTheDocument();
});
