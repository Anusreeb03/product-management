import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
//useQueryClient:To refresh the product list after updating a product.
import { updateProduct } from "../api";
import type { Product } from "../types";

interface EditProductProps {
    product: Product;
    onClose: () => void;
}

function EditProduct({ product, onClose }: EditProductProps) {

    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(String(product.price));
    const [category, setCategory] = useState(product.category);
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            alert("Product updated successfully!");
            queryClient.invalidateQueries({
                queryKey: ["products"]
            });
            onClose();
        },
        onError: (error) => {
            console.log("Update error:", error);
        }
    });

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedProduct: Product = {
            id: product.id,
            name: name,
            price: Number(price),
            category: category
        };
        console.log("Updating product:", updatedProduct);
        updateMutation.mutate(updatedProduct);
    };

    return (
        <div>
            <h3>Edit Product</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Furniture">Furniture</option>
                </select>
                <button type="submit" disabled={updateMutation.isPending}>
                    {updateMutation.isPending ? "Updating..." : "Update"}
                </button>
                <button type="button" onClick={onClose}>
                    Cancel
                </button>
            </form>
            {updateMutation.isError && (
                <p style={{ color: "red" }}>
                    {updateMutation.error.message}
                </p>
            )}
        </div>
    );
}

export default EditProduct;