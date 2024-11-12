import React from "react";
import "./ProductList.css";

const ProductList = ({ products }) => {
    return (
        <div className="product-list">
            {products.length ? (
                products.map((product) => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>Category: {product.category}</p>
                        <p>Brand: {product.brand}</p>
                        <p>Price: ${product.price}</p>
                        <p>Rating: {product.rating}</p>
                    </div>
                ))
            ) : (
                <p>No products found</p>
            )}
        </div>
    );
}

export default ProductList;
