import ProductsTable from "../components/ProductsTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function ProductsPage() {
    //const nvaigate = useNavigate();
    return (
        <>
            <h2>List of Products</h2>
            <ProductsTable/>
        </>
    )
}

export default ProductsPage;