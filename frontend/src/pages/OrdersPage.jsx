import OrdersTable from "../components/OrdersTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useReset } from '../context/ResetContext';
const API_URL = import.meta.env.VITE_API_BASE_URL

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
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

    useEffect(() => {
        if(resetTriggered) {
            const resetData = async () => {
                setMessage(resetMessage);
                setIsLoading(true);
                if (resetSuccess) {
                    try {
                        await Promise.all([fetchOrders(), fetchProducts()]);
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
                await Promise.all([fetchOrders(), fetchProducts()]);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, []);

    return (
        <>
            <h1 className="text-xl font-medium underline underline-offset-2 mb-4 text-black">List of Orders</h1>
            {isLoading ? <div className="text-center py-4">Loading...</div> : <OrdersTable orders={orders}/>}
            {message && (
                <div className={`p-3 my-4 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}
        </>
    )
}

export default OrdersPage;