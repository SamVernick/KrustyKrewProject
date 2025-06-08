import CustomersTable from "../components/CustomersTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useReset } from '../context/ResetContext';
const API_URL = import.meta.env.VITE_API_BASE_URL

function CustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [updateCustomerId, setUpdateCustomerId] = useState("");
    const [updateCustomerFName, setUpdateCustomerFName] = useState("");
    const [updateCustomerLName, setUpdateCustomerLName] = useState("");
    const [deleteCustomerId, setDeleteCustomerId] = useState("");
    const [newCustomerFName, setNewCustomerFName] = useState("");
    const [newCustomerLName, setNewCustomerLName] = useState("");
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

    // Handle Delete Customer
    const handleDelete = async (e) => {
        e.preventDefault();
        if (!deleteCustomerId) {
            setMessage("Please select a customer to delete");
            return;
        }
        
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/api/customers/${deleteCustomerId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete customer');
            }
            setMessage('Customer deleted successfully!');
            fetchCustomers();
        } catch (error) {
            console.error('Error deleting customer:', error);
            setMessage('Failed to delete customer. Please try again.');
            setIsLoading(false);
        }
    };
    
    // Handle Update Customer
    const handleUpdate = async (e) => {
        e.preventDefault();
        if(!updateCustomerId){
            setMessage("Please select a customer to update");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/api/customers/${updateCustomerId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: updateCustomerId,
                    firstName: updateCustomerFName,
                    lastName: updateCustomerLName
                })
            });
            if(!response.ok){
                throw new Error('Failed to update customer');
            }
            setMessage('Customer updated successfully!');
            fetchCustomers();
        } catch (error){
            console.error('Error updating customer:', error);
            setMessage('Failed to update customer. Please try again.');
            setIsLoading(false);
        }
    }

    // Handle Add Customer
    const handleAdd = async (e) => {
        e.preventDefault();
        if(!newCustomerFName){
            setMessage("Please set the customer first name before adding");
            return;
        }

        try {
            setIsLoading(true);
            setMessage('Customer created successfully!');
            fetchCustomers();
        } catch (error) {
            console.error('Error creating customer:', error);
            setMessage('Failed to create customer. Please try again.');
            setIsLoading(false);
        }
    }

    return (
        <>
            <h1 className="text-xl font-medium underline underline-offset-2 mb-4 text-black">List of Customers</h1>
            {isLoading ? <div className="text-center py-4">Loading...</div> : <CustomersTable customers={customers}/>}
            {message && (
                <div className={`p-3 my-4 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Create New Customer</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4" onSubmit={handleAdd}>
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">First Name: </label>
                        <input type="text" 
                            className="border border-black rounded-lg p-2 w-full bg-cyan-100"
                            value={newCustomerFName}
                            onChange={(e) => setNewCustomerFName(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Last Name: </label>
                        <input type="text" 
                            className="border border-black rounded-lg p-2 w-full bg-cyan-100"
                            value={newCustomerLName}
                            onChange={(e) => setNewCustomerLName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                
                <input type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer mt-2"/>
            </form>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Update Customer</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4" onSubmit={handleUpdate}>
                <div className="space-y-2">
                    <label className="text-lg font-medium text-black">Choose Customer to Update: </label>
                    <select className="border border-black rounded-lg p-2 bg-cyan-100">
                        <option value="">Select a Customer</option>
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
                        <input type="text" 
                            className="border border-black rounded-lg p-2 w-full bg-cyan-100"
                            value={updateCustomerFName}
                            onChange={(e) => setNewCustomerFName(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Last Name: </label>
                        <input type="text" 
                            className="border border-black rounded-lg p-2 w-full bg-cyan-100"
                            value={updateCustomerLName}
                            onChange={(e) => setNewCustomerLName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                
                <input type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer mt-2"/>
            </form>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Delete Customer</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4" onSubmit={handleDelete}>
                <div className="flex flex-col space-y-2">
                    <label className="text-lg font-medium text-black">Choose a Customer to Delete: </label>
                    <select 
                        className="border border-black rounded-lg p-2 bg-cyan-100"
                        value={deleteCustomerId}
                        onChange={(e) => setDeleteCustomerId(e.target.value)}
                        required
                    >
                        <option value="">Select a Customer</option>
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