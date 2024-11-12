import React from "react";
import "../CustomSelect/CustomSelect.css"

const SortOptions = ({ sort, setSort }) => {
    return (
        <div className="select-wrapper">
            <label htmlFor="sort" className="label">Sort</label>
            <select id="sort"  className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">None</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating</option>
            </select>
        </div>
    );
}

export default SortOptions;
