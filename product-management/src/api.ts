import type { Product } from "./types";
const API_URL = "http://localhost:3000/products";

// GET: Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
};

// POST: Add a new product
export const addProduct = async (
    product: Omit<Product, "id">
//When adding a product, we don't need to provide an ID because 
// JSON Server generates it.
//Omit removes the specified property from an existing TypeScript type.
): Promise<Product> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });

    if (!response.ok) {
        throw new Error("Failed to add product");
    }
    return response.json();
};

export const updateProduct = async (
    product: Product
): Promise<Product> => {
    const response = await fetch(
        `${API_URL}/${product.id}`,
        {
            method: "PUT",
            //Headers provide additional information about the HTTP request.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        }
    );
    if (!response.ok) {
        throw new Error("Failed to update product");
    }
    return response.json();
};

// DELETE: Delete product
export const deleteProduct = async (
    id: string
): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    if (!response.ok) {
        throw new Error("Failed to delete product");
    }
};