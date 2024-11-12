import React from "react";
import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";

describe("ProductList Component", () => {
    const products = [
        { id: 1, name: "Product 1", category: "Electronics", brand: "Apple", price: 100, rating: 4 },
        { id: 2, name: "Product 2", category: "Clothing", brand: "Nike", price: 50, rating: 3 },
    ];

    test("renders a list of products", () => {
        render(<ProductList products={products} />);

        expect(screen.getByText("Product 1")).toBeInTheDocument();
        expect(screen.getByText("Category: Electronics")).toBeInTheDocument();
        expect(screen.getByText("Brand: Apple")).toBeInTheDocument();
        expect(screen.getByText("Price: $100")).toBeInTheDocument();
        expect(screen.getByText("Rating: 4")).toBeInTheDocument();

        expect(screen.getByText("Product 2")).toBeInTheDocument();
        expect(screen.getByText("Category: Clothing")).toBeInTheDocument();
        expect(screen.getByText("Brand: Nike")).toBeInTheDocument();
        expect(screen.getByText("Price: $50")).toBeInTheDocument();
        expect(screen.getByText("Rating: 3")).toBeInTheDocument();
    });

    test("displays 'No products found' message when product list is empty", () => {
        render(<ProductList products={[]} />);

        expect(screen.getByText("No products found")).toBeInTheDocument();
    });
});
