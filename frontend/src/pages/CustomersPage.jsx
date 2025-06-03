import CustomersTable from "../components/CustomersTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useReset } from '../context/ResetContext';
const API_URL = import.meta.env.VITE_API_BASE_URL

function CustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { resetMessage, resetSuccess, resetTriggered, setResetMessage } = useReset();

    const fetchCustomers = async() => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/api/customers`);
            if (!response.ok) {
                throw new Error('Failed to fetch customers');
            }
            const data = await response.json();
            setCustomers(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching customers:', error);
            setMessage('Failed to load customers. Please try again.');
            setIsLoading(false);
        }
    }

     useEffect(() => {
        if(resetTriggered) {
            setMessage(resetMessage);
            if (resetSuccess) {
                fetchCustomers();
            }
            setIsLoading(false);
        }
    }, [resetTriggered, resetMessage, resetSuccess]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <>
            <h1 className="text-xl font-medium underline underline-offset-2 mb-4 text-black">List of Customers</h1>
            <CustomersTable customers={customers}/>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Update Customer</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4">
                <div className="space-y-2">
                    <label className="text-lg font-medium text-black">Choose Customer to Update: </label>
                    <select className="border border-black rounded-lg p-2 bg-cyan-100">
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>
                                {customer.firstName} {customer.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">First Name: </label>
                        <input type="text" className="border border-black rounded-lg p-2 w-full bg-cyan-100" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Last Name: </label>
                        <input type="text" className="border border-black rounded-lg p-2 w-full bg-cyan-100" />
                    </div>
                </div>
                
                <input type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer mt-2"/>
            </form>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Delete Customer</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4">
                <div className="flex flex-col space-y-2">
                    <label className="text-lg font-medium text-black">Choose a Customer to Delete: </label>
                    <select className="border border-black rounded-lg p-2 bg-cyan-100">
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>
                                {customer.firstName} {customer.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <input type="submit" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer mt-2"/>
            </form>
        </>
    )
}

export default CustomersPage;