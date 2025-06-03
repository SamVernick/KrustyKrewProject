import InvoiceTable from "../components/InvoiceTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useReset } from "../context/ResetContext";
const API_URL = import.meta.env.VITE_API_BASE_URL

function InvoicesPage() {
    const [invoices, setInvoices] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <>
            <div className="bd-47">
                <h1 className="text-xl font-medium underline underline-offset-2 mb-4 text-black">List of Invoices:</h1>
                <InvoiceTable invoices={invoices}/>
            </div>
        </>
    )
}

export default InvoicesPage;