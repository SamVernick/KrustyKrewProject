import OrdersTable from "../components/OrdersTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useReset } from '../context/ResetContext';
const API_URL = import.meta.env.VITE_API_BASE_URL

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [newOrderPID, setNewOrderPID] = useState("");
    const [newOrderCID, setNewOrderCID] = useState("");
    const [newAmount, setNewAmount] = useState(0);
    const [deleteOrderId, setDeleteOrderId] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { resetMessage, resetSuccess, resetTriggered, setResetMessage } = useReset();

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${API_URL}/api/orders`);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setMessage('Failed to load orders. Please try again.');
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
            setMessage('Failed to load products. Please try again.');
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await fetch(`${API_URL}/api/customers`);
            if (!response.ok) {
                throw new Error('Failed to fetch customers');
            }
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
            setMessage('Failed to load customers. Please try again.');
        }
    };

    useEffect(() => {
        if(resetTriggered) {
            const resetData = async () => {
                setMessage(resetMessage);
                setIsLoading(true);
                if (resetSuccess) {
                    try {
                        await Promise.all([fetchOrders(), fetchProducts(), fetchCustomers()]);
                    } catch (error) {
                        console.error('Error refreshing data after reset:', error);
                    }
                }
                setIsLoading(false);
            };
            resetData();
        }
    }, [resetTriggered, resetMessage, resetSuccess]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await Promise.all([fetchOrders(), fetchProducts(), fetchCustomers()]);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, []);

    const handleAdd = async(e) => {
        e.preventDefault();
        if(!newOrderPID || !newOrderCID){
            setMessage("Please select a product and customer for the order");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/api/orders/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    pid : newOrderPID,
                    cid: newOrderCID,
                    amount : newAmount
                })
            });
            if(!response.ok){
                throw new error('Failed to create order');
            }
            setMessage('Order created successfully!');
            setIsLoading(false);
        } catch (error) {
            console.error('Error creating order:', error);
            setMessage('Failed to create order. Please try again.');
            setIsLoading(false);
        }
    }

    const handleDelete = async(e) => {
        e.preventDefault();
        if (!deleteOrderId) {
            setMessage("Please select an order to delete");
            return;
        }
        
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/api/orders/${deleteOrderId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete order');
            }
            setMessage('Order deleted successfully!');
            fetchOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
            setMessage('Failed to delete product. Please try again.');
            setIsLoading(false);
        }
    }

    return (
        <>
            <h1 className="text-xl font-medium underline underline-offset-2 mb-4 text-black">List of Orders</h1>
            {isLoading ? <div className="text-center py-4">Loading...</div> : <OrdersTable orders={orders}/>}
            {message && (
                <div className={`p-3 my-4 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Create an Order</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4" onSubmit={handleAdd}>
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Customer Name:</label>
                        <select className="border border-black rounded-lg p-2 w-full bg-cyan-100"
                            value={newOrderCID}
                            onChange={(e) => setNewOrderCID(e.target.value)}
                            required>
                            <option value="">Select a Customer</option>
                            {customers.map(customer => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.firstName} {customer.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Product Name:</label>
                        <select className="border border-black rounded-lg p-2 w-full bg-cyan-100"
                            value={newOrderPID}
                            onChange={(e) => setNewOrderPID(e.target.value)}
                            required>
                            <option value="">Select a Product</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.productName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Amount: </label>
                            <input
                                type="number"
                                min="1" 
                                step="1" 
                                className="border border-black rounded-lg p-2 w-full bg-cyan-100" 
                                value={newAmount}
                                onChange={(e) => setNewAmount(e.target.value)}
                                required
                            />
                    </div>
                </div>
                <input type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer mt-2"/>
            </form>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Delete an Order</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4" onSubmit={handleDelete}>
                <div className="flex flex-col space-y-2">
                    <label className="text-lg font-medium text-black">Delete Order: </label>
                    <select 
                        className="border border-black rounded-lg p-2 bg-cyan-100"
                        value={deleteOrderId}
                        onChange={(e) => setDeleteOrderId(e.target.value)}
                        required
                    >
                        <option value="">Select an Order</option>
                        {Array.from(new Set(orders.map(order => order.id))).map(id => (
                                <option key={id} value={id}>
                                    {id}
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

export default OrdersPage;