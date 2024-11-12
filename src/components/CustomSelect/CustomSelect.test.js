import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomSelect from "./CustomSelect";

const options = ["Option 1", "Option 2", "Option 3"];
const label = "Choose an option";
const id = "custom-select";

describe("CustomSelect Component", () => {
    test("renders without crashing", () => {
        render(<CustomSelect id={id} label={label} value="" options={options} onChange={() => {}} />);
    });

    test("displays the correct label", () => {
        render(<CustomSelect id={id} label={label} value="" options={options} onChange={() => {}} />);
        expect(screen.getByLabelText(label)).toBeInTheDocument();
    });

    test("displays 'All' as the default option", () => {
        render(<CustomSelect id={id} label={label} value="" options={options} onChange={() => {}} />);
        expect(screen.getByText("All")).toBeInTheDocument();
    });

    test("displays all options", () => {
        render(<CustomSelect id={id} label={label} value="" options={options} onChange={() => {}} />);
        options.forEach(option => {
            expect(screen.getByText(option)).toBeInTheDocument();
        });
    });

    test("calls onChange with the correct value when an option is selected", () => {
        const Wrapper = () => {
            const [value, setValue] = useState("");
            return (
                <CustomSelect
                    id={id}
                    label={label}
                    value={value}
                    options={options}
                    onChange={(e) => setValue(e.target.value)}
                />
            );
        };

        render(<Wrapper />);
        const select = screen.getByLabelText(label);
        fireEvent.change(select, { target: { value: options[0] } });
        expect(select.value).toBe(options[0]);
    });
});
