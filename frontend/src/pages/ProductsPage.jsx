import ProductsTable from "../components/ProductsTable";
import { useEffect, useState } from "react";
import { useReset } from '../context/ResetContext';
const API_URL = import.meta.env.VITE_API_BASE_URL;

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [deleteProductId, setDeleteProductId] = useState("");
    const [updateProductId, setUpdateProductId] = useState("");
    const [updateProductName, setUpdateProductName] = useState("");
    const [updateProductPrice, setUpdateProductPrice] = useState("");
    const [newProductName, setNewProductName] = useState("");
    const [newProductPrice, setNewProductPrice] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { resetMessage, resetSuccess, resetTriggered, setResetMessage } = useReset();

    // Fetch products from the backend
    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/api/products`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setMessage('Failed to load products. Please try again.');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if(resetTriggered) {
            setMessage(resetMessage);
            if (resetSuccess) {
                fetchProducts();
            }
            setIsLoading(false);
        }
    }, [resetTriggered, resetMessage, resetSuccess]);

    useEffect(() => {
        fetchProducts();
    },[]);

    // Handle Delete Product
    const handleDelete = async (e) => {
        e.preventDefault();
        if (!deleteProductId) {
            setMessage("Please select a product to delete");
            return;
        }
        
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/api/products/${deleteProductId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            setMessage('Product deleted successfully!');
            // Refetch products after deletion
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            setMessage('Failed to delete product. Please try again.');
            setIsLoading(false);
        }
    };

    // Handle Update Product
    const handleUpdate = async (e) => {
        e.preventDefault();
        if(!updateProductId){
            setMessage("Please select a product to update");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/api/products/${updateProductId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: updateProductId,
                    name: updateProductName,
                    price: updateProductPrice
                })
            });
            if(!response.ok){
                throw new Error('Failed to update product');
            }
            setMessage('Product updated successfully!');
            fetchProducts();
        } catch (error){
            console.error('Error updating product:', error);
            setMessage('Failed to update product. Please try again.');
            setIsLoading(false);
        }
    }

    // Handle Add Product
    const handleAdd = async (e) => {
        e.preventDefault();
        if(!newProductName || !newProductPrice){
            setMessage("Please set the product name and price before adding");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/api/products/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: newProductName,
                    price: newProductPrice
                })
            });
            if(!response.ok){
                throw new Error('Failed to create product');
            }
            setMessage('Product created successfully!');
            fetchProducts();
        } catch (error) {
            console.error('Error creating product:', error);
            setMessage('Failed to create product. Please try again.');
            setIsLoading(false);
        }
    }

    return (
        <>
            <h1 className="text-xl font-medium underline underline-offset-2 mb-4 text-black">List of Products</h1>
            {isLoading ? <div className="text-center py-4">Loading...</div> : <ProductsTable products={products}/>}
            {message && (
                <div className={`p-3 my-4 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Create New Product</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4" onSubmit={handleAdd}>
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">New Product Name: </label>
                        <input type="text" 
                            className="border border-black rounded-lg p-2 w-full bg-cyan-100"
                            value={newProductName}
                            onChange={(e) => setNewProductName(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Price: </label>
                        <input
                            type="number" 
                            step="0.01" 
                            className="border border-black rounded-lg p-2 w-full bg-cyan-100" 
                            value={newProductPrice}
                            onChange={(e) => setNewProductPrice(e.target.value)}
                            required
                        />
                    </div>
                </div>
                
                <input type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer mt-2"/>
            </form>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Update a Product</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4" onSubmit={handleUpdate}>
                <div className="space-y-2">
                    <label className="text-lg font-medium text-black">Old Product Name: </label>
                    <select className="border border-black rounded-lg p-2 bg-cyan-100"
                        value={updateProductId}
                        onChange={(e) => setUpdateProductId(e.target.value)}
                        required>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.productName}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">New Product Name: </label>
                        <input type="text" 
                            className="border border-black rounded-lg p-2 w-full bg-cyan-100"
                            value={updateProductName}
                            onChange={(e) => setUpdateProductName(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Price: </label>
                        <input
                            type="number" 
                            step="0.01" 
                            className="border border-black rounded-lg p-2 w-full bg-cyan-100" 
                            value={updateProductPrice}
                            onChange={(e) => setUpdateProductPrice(e.target.value)}
                            required
                        />
                    </div>
                </div>
                
                <input type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer mt-2"/>
            </form>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Delete a Product</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4" onSubmit={handleDelete}>
                <div className="flex flex-col space-y-2">
                    <label className="text-lg font-medium text-black">Delete Product: </label>
                    <select 
                        className="border border-black rounded-lg p-2 bg-cyan-100"
                        value={deleteProductId}
                        onChange={(e) => setDeleteProductId(e.target.value)}
                        required
                    >
                        <option value="">Select a product</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.productName}
                            </option>
                        ))}
                    </select>
                </div>
                <input 
                    type="submit" 
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer mt-2"
                    value="Delete"
                    disabled={isLoading}
                />
            </form>
        </>
    )
}

export default ProductsPage;