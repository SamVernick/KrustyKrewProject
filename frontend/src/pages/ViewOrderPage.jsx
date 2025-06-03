import OrderDetailsTable from "../components/OrderDetailsTable";
import SelectQuantity from "../components/SelectQuantity";
import { useReset } from '../context/ResetContext';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_BASE_URL;

function OrderDetailsPage() {
    const [orderDetails, setOrderDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const { resetMessage, resetSuccess, resetTriggered, setResetMessage } = useReset();

    const fetchOrderDetails = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/api/orderdetails`);
            if (!response.ok) {
                throw new Error('Failed to fetch order details');
            }
            const data = await response.json();
            setOrderDetails(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching order details:', error);
            setMessage('Failed to load order details. Please try again.');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if(resetTriggered) {
            setMessage(resetMessage);
            if (resetSuccess) {
                fetchOrderDetails();
            }
            setIsLoading(false);
        }
    }, [resetTriggered, resetMessage, resetSuccess]);

    useEffect(() => {
        fetchOrderDetails();
    }, []);
    
    return (
        <>
            <h1 className="text-xl font-medium underline underline-offset-2 mb-4 text-black">Order Details</h1>
            <OrderDetailsTable orderDetails={orderDetails}/>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Add New Order Detail</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4">
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Order ID:</label>
                        <select className="border border-black rounded-lg p-2 w-full bg-cyan-100">
                            {Array.from(new Set(orderDetails.map(detail => detail.orderID))).map(orderId => (
                                <option key={orderId} value={orderId}>
                                    {orderId}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Product Name:</label>
                        <select className="border border-black rounded-lg p-2 w-full bg-cyan-100">
                            {orderDetails.map(details => (
                                <option key={details.id} value={details.productName}>
                                    {details.productName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-lg font-medium text-black">Amount of Product: </label>
                        <SelectQuantity/>
                    </div>
                </div>

                <input type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer mt-2"/>
            </form>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Update Order Details</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4">
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Order Detail ID:</label>
                        <select className="border border-black rounded-lg p-2 w-full bg-cyan-100">
                            {orderDetails.map(details => (
                                <option key={details.id} value={details.id}>
                                    {details.id}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Product Name:</label>
                        <select className="border border-black rounded-lg p-2 w-full bg-cyan-100">
                            {orderDetails.map(details => (
                            <option key={details.id} value={details.productID}>
                                {details.productName} (Product ID: {details.productID})
                            </option>
                        ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-lg font-medium text-black">Amount of Product: </label>
                        <SelectQuantity/>
                    </div>
                    
                </div>
                
                
                <input type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer mt-2"/>
            </form>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Delete Order Details</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4">
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Product: </label>
                        <select className="border border-black rounded-lg p-2 w-full bg-cyan-100">
                            {orderDetails.map(details => (
                            <option key={details.id} value={details.productID}>
                                {details.productName} (Product ID: {details.productID})
                            </option>
                        ))}
                        </select>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Order Number: </label>
                        <select className="border border-black rounded-lg p-2 w-full bg-cyan-100">
                            {Array.from(new Set(orderDetails.map(detail => detail.orderID))).map(orderId => (
                                <option key={orderId} value={orderId}>
                                    {orderId}
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