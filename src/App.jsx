import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import FilterPanel from "./components/FilterPanel";
import ClipLoader from "react-spinners/ClipLoader";
import mockData from "./data/mockData";
import './App.css';

function App() {
    const initialFilters = {
        category: '',
        brand: '',
        priceRange: [0, 500],
        rating: 0,
    };
    const initialSort = "";

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState(() => JSON.parse(localStorage.getItem('filters')) || initialFilters);
    const [sort, setSort] = useState(() => localStorage.getItem("sort") || initialSort);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setProducts(mockData);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        localStorage.setItem("filters", JSON.stringify(filters));
        localStorage.setItem("sort", sort);
    }, [filters, sort]);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            let filtered = [...products];

            if (filters.category) {
                filtered = filtered.filter((product) => product.category === filters.category);
            }
            if (filters.brand) {
                filtered = filtered.filter((product) => product.brand === filters.brand);
            }
            if (filters.rating) {
                filtered = filtered.filter((product) => product.rating >= filters.rating);
            }
            if (filters.priceRange) {
                filtered = filtered.filter(
                    (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
                );
            }

            if (sort === "price-asc") {
                filtered.sort((a, b) => a.price - b.price);
            } else if (sort === "price-desc") {
                filtered.sort((a, b) => b.price - a.price);
            } else if (sort === "rating") {
                filtered.sort((a, b) => b.rating - a.rating);
            }

            setFilteredProducts(filtered);
            setLoading(false);
        }, 500);
    }, [filters, sort, products]);

    const resetFilters = () => {
        setFilters(initialFilters);
        setSort(initialSort);
        localStorage.removeItem("filters");
        localStorage.removeItem("sort");
    };

    return (
        <div className="app">
            <h1>Product Catalog</h1>
            <div className="filter-container">
                <FilterPanel
                    filters={filters}
                    setFilters={setFilters}
                    categories={Array.from(new Set(mockData.map((product) => product.category)))}
                    brands={Array.from(new Set(mockData.map((product) => product.brand)))}
                    sort={sort}
                    setSort={setSort}
                    resetFilters={resetFilters}
                />
            </div>
            {loading ? (
                <div className="loader-container" role="status" aria-label="loading">
                    <ClipLoader color={"#123abc"} loading={loading} size={50} />
                </div>
            ) : (
                <ProductList products={filteredProducts} />
            )}
        </div>
    );
}

export default App;
