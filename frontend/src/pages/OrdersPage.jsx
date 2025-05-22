import OrdersTable from "../components/OrdersTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ResetButton from "../components/ResetButton";

function OrdersPage() {
    //const nvaigate = useNavigate();
    return (
        <>
            <h1 className="text-xl font-medium underline underline-offset-2 mb-4 text-black">List of Orders</h1>
            <OrdersTable/>
            <ResetButton></ResetButton>
        </>
    )
}

export default OrdersPage;