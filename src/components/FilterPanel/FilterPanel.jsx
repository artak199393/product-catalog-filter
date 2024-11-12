import React from "react";
import CustomSelect from "../CustomSelect";
import "./FilterPanel.css"
import SortOptions from "../SortOptions";

const FilterPanel = ({ filters, setFilters, categories, brands, sort, setSort, resetFilters }) => {

    const handleCategoryChange = (e) => {
        setFilters((prev) => ({ ...prev, category: e.target.value }));
    };

    const handleBrandChange = (e) => {
        setFilters((prev) => ({ ...prev, brand: e.target.value }));
    };

    const handleRatingChange = (e) => {
        setFilters((prev) => ({ ...prev, rating: Number(e.target.value) }));
    };

    const handleMinPriceChange = (e) => {
        const minPrice = Number(e.target.value);
        setFilters((prev) => ({
            ...prev,
            priceRange: [minPrice, Math.max(minPrice, prev.priceRange[1])],
        }));
    };

    const handleMaxPriceChange = (e) => {
        const maxPrice = Number(e.target.value);
        setFilters((prev) => ({
            ...prev,
            priceRange: [Math.min(maxPrice, prev.priceRange[0]), maxPrice],
        }));
    };

    return (
        <div className="filter-panel">
            <div className='filter-header'>
                <h2>Filters</h2>
                <button className="reset-button" onClick={resetFilters}>Clear Filters</button>
            </div>
            <div className="filter-wrapper">
                <CustomSelect
                    id="category"
                    label="Category"
                    value={filters.category}
                    options={categories}
                    onChange={handleCategoryChange}
                />

                <CustomSelect
                    id="brand"
                    label="Brand"
                    value={filters.brand}
                    options={brands}
                    onChange={handleBrandChange}
                />

                <CustomSelect
                    id="rating"
                    label="Rating"
                    value={filters.rating}
                    options={["4", "3", "2", "1"]}
                    onChange={handleRatingChange}
                />
                <SortOptions sort={sort} setSort={setSort}/>
                <div className="price-wrapper">
                    <label>Price Range</label>
                    <div className="price-range">
                        <div className="input-container">
                            <label htmlFor="minPrice">Min:</label>
                            <input
                                id="minPrice"
                                type="range"
                                min="0"
                                max="500"
                                value={filters.priceRange[0]}
                                onChange={handleMinPriceChange}
                            />
                            <span>{filters.priceRange[0]}</span>
                        </div>
                        <div className="input-container">
                            <label htmlFor="maxPrice">Max:</label>
                            <input
                                id="maxPrice"
                                type="range"
                                min="0"
                                max="500"
                                value={filters.priceRange[1]}
                                onChange={handleMaxPriceChange}
                            />
                            <span>{filters.priceRange[1]}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterPanel;
