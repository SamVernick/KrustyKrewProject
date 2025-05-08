import CustomersTable from "../components/CustomersTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function CustomersPage() {
    //const nvaigate = useNavigate();
    return (
        <>
            <h2>List of Customers</h2>
            <CustomersTable/>
        </>
    )
}

export default CustomersPage;