import ProductsTable from "../components/ProductsTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ResetButton from "../components/ResetButton";
const API_URL = import.meta.env.VITE_API_BASE_URL;

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [deleteProductId, setDeleteProductId] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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

    // Handle reset database
    const handleReset = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/api/reset`, {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error('Failed to reset database');
            }
            setMessage('Database reset successfully!');
            // Refetch products after reset
            fetchProducts();
        } catch (error) {
            console.error('Error resetting database:', error);
            setMessage('Failed to reset database. Please try again.');
            setIsLoading(false);
        }
    };

    // Handle delete product
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

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

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
            <form className="border-2 border-black rounded-lg p-4 space-y-4">
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">New Product Name: </label>
                        <input type="text" className="border border-black rounded-lg p-2 w-full bg-cyan-100" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Price: </label>
                        <input type="text" className="border border-black rounded-lg p-2 w-full bg-cyan-100" />
                    </div>
                </div>
                
                <input type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer mt-2"/>
            </form>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Update a Product</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4">
                <div className="space-y-2">
                    <label className="text-lg font-medium text-black">Old Product Name: </label>
                    <select className="border border-black rounded-lg p-2 bg-cyan-100">
                        <option>Krabby Patty</option>
                        <option>Krabby Meal</option>
                        <option>Salty Sea Dog</option>
                        <option>Kelp Shake</option>
                    </select>
                </div>
                
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">New Product Name: </label>
                        <input type="text" className="border border-black rounded-lg p-2 w-full bg-cyan-100" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Price: </label>
                        <input type="text" className="border border-black rounded-lg p-2 w-full bg-cyan-100" />
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
            <div className="mt-8">
                <ResetButton onClick={handleReset}/>
            </div>
        </>
    )
}

export default ProductsPage;