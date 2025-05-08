import OrdersTable from "../components/OrdersTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function OrdersPage() {
    //const nvaigate = useNavigate();
    return (
        <>
            <h2>List of Orders</h2>
            <OrdersTable/>
        </>
    )
}

export default OrdersPage;