import InvoiceTable from "../components/InvoiceTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function InvoicesPage() {
    //const nvaigate = useNavigate();
    return (
        <>
            <h2>List of Invoices</h2>
            <InvoiceTable/>
        </>
    )
}

export default InvoicesPage;