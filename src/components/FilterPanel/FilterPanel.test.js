import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterPanel from "./FilterPanel";

describe("FilterPanel Component", () => {
    const mockSetFilters = jest.fn();
    const mockSetSort = jest.fn();
    const mockResetFilters = jest.fn();
    const filters = {
        category: "Electronics",
        brand: "Apple",
        rating: "4",
        priceRange: [100, 300],
    };
    const categories = ["Electronics", "Clothing", "Home"];
    const brands = ["Apple", "Samsung", "Sony"];
    const sort = "price";

    const setup = () => render(
        <FilterPanel
            filters={filters}
            setFilters={mockSetFilters}
            categories={categories}
            brands={brands}
            sort={sort}
            setSort={mockSetSort}
            resetFilters={mockResetFilters}
        />
    );

    test("renders all filter elements", () => {
        setup();
        expect(screen.getByLabelText("Category")).toBeInTheDocument();
        expect(screen.getByLabelText("Brand")).toBeInTheDocument();
        expect(screen.getByLabelText("Rating")).toBeInTheDocument();
        expect(screen.getByText("Price Range")).toBeInTheDocument();
        expect(screen.getByText("Clear Filters")).toBeInTheDocument();
    });

    test("calls setFilters when category is changed", () => {
        setup();
        fireEvent.change(screen.getByLabelText("Category"), { target: { value: "Clothing" } });
        expect(mockSetFilters).toHaveBeenCalledWith(expect.any(Function));
    });

});
