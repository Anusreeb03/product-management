import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./api";
import type { Product } from "./types";
import { useState } from "react";
import AddProduct from "./components/AddProduct";
import DeleteProduct from "./components/DeleteProduct";
import EditProduct from "./components/EditProduct";
function App() {
    const [selectedProduct, setSelectedProduct] =
        useState<Product | null>(null);
    // Fetch products using useQuery
    const {
        data: products,
        isLoading,
        isError,
        error
    } = useQuery<Product[], Error>({
        queryKey: ["products"],
        queryFn: fetchProducts
    });
    if (isLoading) {
        return <h2>Loading products...</h2>;
    }
    if (isError) {
        return <h2>Error: {error.message}</h2>;
    }
    return (
        <div>
            <h1>Product Management</h1>
            <AddProduct />
            <h2>Product List</h2>
            {products?.map((product: Product) => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>Price: {product.price}</p>
                    <p>Category: {product.category}</p>
                    {/* EDIT BUTTON */}
                    <button
                        onClick={() => setSelectedProduct(product)}
                    >
                        Edit
                    </button>
                    {/* DELETE COMPONENT */}
                    <DeleteProduct id={product.id} />
                    {/* EDIT FORM */}
                    {selectedProduct?.id === product.id && (
                        <EditProduct
                            product={product}
                            onClose={() => setSelectedProduct(null)}
                        />
                    )}
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default App;
