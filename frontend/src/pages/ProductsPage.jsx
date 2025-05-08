import ProductsTable from "../components/ProductsTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function ProductsPage() {
    //const nvaigate = useNavigate();
    return (
        <>
            <h2>List of Products</h2>
            <ProductsTable/>

            <h2>Create New Product</h2>
            <form class="gForm">
                <label>New Product Name: 
                    <input type="text" />
                </label>
                <label>Price: 
                    <input type="text" />
                </label>
                <input type="submit"/>
            </form>

            <h2>Update a Product</h2>
            <form class="gForm">
                <label>Old Product Name: </label>
                <select>
                    <option>Krabby Patty</option>
                    <option>Krabby Meal</option>
                    <option>Salty Sea Dog</option>
                    <option>Kelp Shake</option>
                </select>
                <label>New Product Name: 
                    <input type="text" />
                </label>
                <label>Price: 
                    <input type="text" />
                </label>
                <input type="submit"/>
            </form>

            <h2>Delete a Product</h2>
            <form class="gForm">
                <label>Delete Product: </label>
                <select>
                    <option>Krabby Patty</option>
                    <option>Krabby Meal</option>
                    <option>Salty Sea Dog</option>
                    <option>Kelp Shake</option>
                </select>
                <input type="submit"/>
            </form>

        </>
    )
}

export default ProductsPage;