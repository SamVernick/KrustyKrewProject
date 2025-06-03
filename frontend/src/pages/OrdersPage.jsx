import OrdersTable from "../components/OrdersTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useReset } from '../context/ResetContext';
const API_URL = import.meta.env.VITE_API_BASE_URL

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { resetMessage, resetSuccess, resetTriggered, setResetMessage } = useReset();

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/api/orders`);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setMessage('Failed to load orders. Please try again.');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if(resetTriggered) {
            setMessage(resetMessage);
            if (resetSuccess) {
                fetchOrders();
            }
            setIsLoading(false);
        }
    }, [resetTriggered, resetMessage, resetSuccess]);

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <h1 className="text-xl font-medium underline underline-offset-2 mb-4 text-black">List of Orders</h1>
            <OrdersTable orders={orders}/>
        </>
    )
}

export default OrdersPage;