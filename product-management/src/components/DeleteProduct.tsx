import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import { deleteProduct } from "../api";
interface DeleteProductProps {
    id: string;
}
function DeleteProduct({ id }: DeleteProductProps) {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"]
            });
            alert("Product deleted successfully!");
        }
    });
    const handleDelete = () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );
        if (confirmDelete) {
            deleteMutation.mutate(id);
        }
    };
    return (
        <div>
            <button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
            >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </button>
            {deleteMutation.isError && (
                <p style={{ color: "red" }}>
                    {deleteMutation.error.message}
                </p>
            )}
        </div>
    );
}
export default DeleteProduct;
