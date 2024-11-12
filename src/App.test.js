import React from "react";
import {render, screen, fireEvent, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import App from "./App";
import mockData from "./data/mockData";

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("displays loading spinner initially", async () => {
    render(<App />);
    expect(screen.getByRole("status", { name: "loading" })).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());
  });

  test("displays products after loading", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByLabelText("loading"));


    await waitFor(() => {
      mockData.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
      });
    });
  });

  test("filters products by category", async () => {
    render(<App />);
    await screen.findByText("Product Catalog");

    const categorySelect = screen.getByLabelText("Category");
    fireEvent.change(categorySelect, { target: { value: mockData[0].category } });

    await waitFor(() => {
      expect(screen.getAllByText(mockData[0].category).length).toBeGreaterThan(0);
    });
  });

  test("sorts products by price ascending", async () => {
    render(<App />);
    await screen.findByText("Product Catalog");

    const sortSelect = screen.getByLabelText("Sort");
    fireEvent.change(sortSelect, { target: { value: "price-asc" } });

    await waitForElementToBeRemoved(() => screen.queryByLabelText("loading"));

    await waitFor(() => {
      const prices = screen.getAllByText((content) =>
          content.includes("Price: $")
      ).map((node) =>
          Number(node.textContent.replace("Price: $", ""))
      );

      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sortedPrices);
    });
  });


  test("resets filters and sort", async () => {
    render(<App />);
    await screen.findByText("Product Catalog");
    fireEvent.click(screen.getByText("Clear Filters"));
    const categorySelect = await screen.findByLabelText("Category");
    expect(categorySelect.value).toBe("");
    const sortSelect = await screen.findByLabelText("Sort");
    expect(sortSelect.value).toBe("");
  });
});
