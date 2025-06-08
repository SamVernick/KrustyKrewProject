import OrderDetailsTable from "../components/OrderDetailsTable";
import SelectQuantity from "../components/SelectQuantity";
import { useReset } from '../context/ResetContext';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_BASE_URL;

function OrderDetailsPage() {
    const [orderDetails, setOrderDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [addOrderId, setAddOrderId] = useState("");
    const [productIDToAdd, setProductIDToAdd] = useState("")
    const [addQuantity, setAddQuantity] = useState(1);
    const [updateQuantity, setUpdateQuantity] = useState(1);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [updateOrderDetailId, setUpdateOrderDetailId] = useState("");
    const [deleteOrderDetailId, setDeleteOrderDetailId] = useState("");
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");

    const { resetMessage, resetSuccess, resetTriggered, setResetMessage } = useReset();

    const fetchOrderDetails = async () => {
        try {
            const response = await fetch(`${API_URL}/api/orderdetails`);
            if (!response.ok) {
                throw new Error('Failed to fetch order details');
            }
            const data = await response.json();
            setOrderDetails(data);
        } catch (error) {
            console.error('Error fetching order details:', error);
            setMessage('Failed to load order details. Please try again.');
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_URL}/api/products`);
            if (!response.ok) {
            throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

        useEffect(() => {
        if(resetTriggered) {
            const resetData = async () => {
                setMessage(resetMessage);
                setIsLoading(true);
                if (resetSuccess) {
                    try {
                        await Promise.all([fetchOrderDetails(), fetchProducts()]);
                    } catch (error) {
                        console.error('Error refreshing data after reset:', error);
                    }
                }
                setIsLoading(false);
            };
            resetData();
        }
    }, [resetTriggered, resetMessage, resetSuccess]);

    const fetchData = async () => {
            setIsLoading(true);
            try {
                await Promise.all([fetchOrderDetails(), fetchProducts()]);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setIsLoading(false);
            }
        };

    useEffect(() => {   
        fetchData();
    }, []);

    useEffect(() => {
        if (addOrderId) {
            const productsInOrder = orderDetails
            .filter(detail => detail.orderID === parseInt(addOrderId))
            .map(detail => detail.productID);
            
            const filteredProducts = products.filter(
            product => !productsInOrder.includes(product.id)
            );
            
            setAvailableProducts(filteredProducts);
        } else {
            setAvailableProducts(products);
        }
    }, [addOrderId, products, orderDetails]);
    

    const handleAdd = async (e) => {
        e.preventDefault();
        if(!addOrderId || !productIDToAdd){
            setMessage("Please select an order and a product before adding");
            return;
        }
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/api/orderdetails/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    oid: addOrderId,
                    pid: productIDToAdd,
                    amount: addQuantity
                })
            });
            if(!response.ok){
                throw new Error('Failed to add orderdetail');
            }
            setMessage("Orderdetail added successfully!");
            fetchData();
        } catch (error) {
            console.error('Error adding orderdetail:', error);
            setMessage('Failed to add orderdetail. Please try again.');
            setIsLoading(false);
        }
    }
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        if(!updateOrderDetailId){
            setMessage("Please select an order detail and amount to update");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/api/orderdetails/${updateOrderDetailId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: updateOrderDetailId,
                    amount: updateQuantity
                })
            });
            if(!response.ok){
                throw new Error('Failed to update orderdetail');
            }
            setMessage('Orderdetail updated successfully!');
            fetchData();
        } catch (error){
            console.error('Error updating orderdetail:', error);
            setMessage('Failed to update orderdetail. Please try again.');
            setIsLoading(false);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!deleteOrderDetailId) {
            setMessage("Please select an order detail to delete");
            return;
        }
        
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/api/orderdetails/${deleteOrderDetailId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete orderdetail');
            }
            setMessage('Orderdetail deleted successfully!');
            fetchData();
        } catch (error) {
            console.error('Error deleting orderdetail:', error);
            setMessage('Failed to delete orderdetail. Please try again.');
            setIsLoading(false);
        }
    }

    return (
        <>
            <h1 className="text-xl font-medium underline underline-offset-2 mb-4 text-black">Order Details</h1>
            {isLoading ? <div className="text-center py-4">Loading...</div> : <OrderDetailsTable orderDetails={orderDetails}/>}
            {message && (
                <div className={`p-3 my-4 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Add New Order Detail</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4" onSubmit={handleAdd}>
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Order ID:</label>
                        <select className="border border-black rounded-lg p-2 w-full bg-cyan-100"
                            value={addOrderId}
                            onChange={(e) => setAddOrderId(e.target.value)}
                        >
                            <option value="">Select an Order</option>
                            {Array.from(new Set(orderDetails.map(detail => detail.orderID))).map(orderId => (
                                <option key={orderId} value={orderId}>
                                    {orderId}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Product Name:</label>
                        <select className="border border-black rounded-lg p-2 w-full bg-cyan-100"
                            disabled={!addOrderId}
                            value={productIDToAdd}
                            onChange={(e) => setProductIDToAdd(e.target.value)}
                        >
                            <option value="">Select a Product</option>
                            {availableProducts.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.productName} (Product ID: {product.id})
                                </option>
                            ))}
                        </select>
                        {availableProducts.length === 0 && addOrderId && (
                            <p className="text-sm text-amber-600 mt-1">
                            All products have already been added to this order
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-lg font-medium text-black">Amount of Product: </label>
                        <SelectQuantity value={addQuantity} onChange={setAddQuantity}/>
                    </div>
                </div>

                <input type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer mt-2"/>
            </form>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Update Order Details</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4" onSubmit={handleUpdate}>
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Order Detail ID:</label>
                        <select 
                            className="border border-black rounded-lg p-2 w-full bg-cyan-100"
                            value={updateOrderDetailId}
                            onChange={(e) => setUpdateOrderDetailId(e.target.value)}
                        >
                            <option value="">Select an Order Detail</option>
                            {orderDetails.map(details => (
                                <option key={details.id} value={details.id}>
                                    {details.id} (Order ID: {details.orderID})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-lg font-medium text-black">Amount of Product: </label>
                        <SelectQuantity value={updateQuantity} onChange={setUpdateQuantity}/>
                    </div>
                    
                </div>
                
                
                <input type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer mt-2"/>
            </form>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Delete Order Details</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4" onSubmit={handleDelete}>
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Order Detail ID:</label>
                        <select 
                            className="border border-black rounded-lg p-2 w-full bg-cyan-100"
                            value={deleteOrderDetailId}
                            onChange={(e) => setDeleteOrderDetailId(e.target.value)}
                        >
                            <option value="">Select an Order Detail</option>
                            {orderDetails.map(details => (
                                <option key={details.id} value={details.id}>
                                    {details.id} (Order ID: {details.orderID})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <input type="submit" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer mt-2"/>
            </form>
        </>
    )
}

export default OrderDetailsPage;