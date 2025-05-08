import OrderDetailsTable from "../components/OrderDetailsTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function OrderDetailsPage() {
    //const nvaigate = useNavigate();
    return (
        <>
            <h2>Order Details</h2>
            <OrderDetailsTable/>
        </>
    )
}

export default OrderDetailsPage;