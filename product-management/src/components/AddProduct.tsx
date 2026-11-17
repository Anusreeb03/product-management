import { useState } from "react";
import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import { addProduct } from "../api";
function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Electronics");

    const queryClient = useQueryClient();

    // Mutation for adding product
    const addMutation = useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            alert("Product added successfully!");
            queryClient.invalidateQueries({
                queryKey: ["products"]
            });

            setName("");
            setPrice("");
            setCategory("Electronics");
        }
    });
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newProduct = {
            name,
            price: Number(price),
            category
        };
        addMutation.mutate(newProduct);
    };
    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <input type="text"placeholder="Product Name"
                value={name} onChange={(e) => setName(e.target.value)}
                required/><br /><br />
                <input type="number"placeholder="Product Price" 
                value={price} onChange={(e) => setPrice(e.target.value)}
                required/><br /><br />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Furniture">Furniture</option>
                </select><br /><br />
                <button type="submit"
                    disabled={addMutation.isPending}>
                    {addMutation.isPending ? "Adding..."
                    : "Add Product"}
                </button>
            </form>
            {addMutation.isError && (
                <p style={{ color: "red" }}>
                    {addMutation.error.message}
                </p>
            )}
        </div>
    );
}
export default AddProduct;
