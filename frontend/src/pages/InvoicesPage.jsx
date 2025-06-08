import InvoiceTable from "../components/InvoiceTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useReset } from "../context/ResetContext";
const API_URL = import.meta.env.VITE_API_BASE_URL

function InvoicesPage() {
    const [invoices, setInvoices] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [payInvoiceID, setPayInvoiceID] = useState("");

    const { resetMessage, resetSuccess, resetTriggered, setResetMessage } = useReset();

    const fetchInvoices = async() => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/api/invoices`);
            if(!response.ok) {
                throw new Error('Failed to fetch invoices');
            }
            const data = await response.json();
            setInvoices(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching invoices: ', error);
            setMessage('Failed to load invoices. Please try again.');
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(resetTriggered) {
            setMessage(resetMessage);
            if (resetSuccess) {
                fetchInvoices();
            }
            setIsLoading(false);
        }
    }, [resetTriggered, resetMessage, resetSuccess]);

    useEffect(() => {
        fetchInvoices();
    }, []);

    const payInvoice = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/api/invoices`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: payInvoiceID
                })
            });
            if(!response.ok){
                throw new Error('Failed to pay invoice');
            }
            setMessage('Paid invoice successfully');
            fetchInvoices();
        } catch (error) {
            console.error('Error paying invoice: ', error);
            setMessage('Failed to pay invoice. Please try again.');
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="bd-47">
                <h1 className="text-xl font-medium underline underline-offset-2 mb-4 text-black">List of Invoices:</h1>
                {isLoading ? <div className="text-center py-4">Loading...</div> : <InvoiceTable invoices={invoices}/>}
                {message && (
                    <div className={`p-3 my-4 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message}
                    </div>
                )}
            </div>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Pay an Invoice</h2>
            <form className="inline-flex border-2 border-black rounded-lg p-4 space-y-4" onSubmit={payInvoice}>
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <select 
                            className="border border-black rounded-lg p-2 bg-cyan-100"
                            value={payInvoiceID}
                            onChange={(e) => setPayInvoiceID(e.target.value)}
                            required
                        >
                            <option value="">Select an Invoice</option>
                            {invoices
                                .filter(invoice => invoice.paid === 0)
                                .map(invoice => (
                                    <option key={invoice.id} value={invoice.id}>
                                        {invoice.id}
                                    </option>
                            ))}
                        </select>
                        <input type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer mt-2 ml-2"/>
                    </div>
                </div>
            </form>
        </>
    )
}

export default InvoicesPage;