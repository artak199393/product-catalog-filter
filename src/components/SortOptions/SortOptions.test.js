import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SortOptions from "./SortOptions";

describe("SortOptions Component", () => {
    const mockSetSort = jest.fn();
    const sort = "price-asc";

    beforeEach(() => {
        mockSetSort.mockClear();
    });

    test("renders sorting options correctly", () => {
        render(<SortOptions sort={sort} setSort={mockSetSort} />);

        expect(screen.getByLabelText("Sort")).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "None" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Price: Low to High" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Price: High to Low" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Rating" })).toBeInTheDocument();
    });

    test("calls setSort with selected option", () => {
        render(<SortOptions sort={sort} setSort={mockSetSort} />);

        const select = screen.getByLabelText("Sort");
        fireEvent.change(select, { target: { value: "price-desc" } });

        expect(mockSetSort).toHaveBeenCalledWith("price-desc");
    });

    test("displays the correct initial sort value", () => {
        render(<SortOptions sort={sort} setSort={mockSetSort} />);

        expect(screen.getByLabelText("Sort").value).toBe("price-asc");
    });
});
