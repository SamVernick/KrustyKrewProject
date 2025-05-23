import InvoiceTable from "../components/InvoiceTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ResetButton from "../components/ResetButton";

function InvoicesPage() {
    //const nvaigate = useNavigate();
    return (
        <>
            <div className="bd-47">
                <h1 className="text-xl font-medium underline underline-offset-2 mb-4 text-black">List of Invoices:</h1>
                <InvoiceTable/>
                <ResetButton></ResetButton>
            </div>
        </>
    )
}

export default InvoicesPage;