import OrderDetailsTable from "../components/OrderDetailsTable";
import SelectQuantity from "../components/SelectQuantity";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function OrderDetailsPage() {
    //const nvaigate = useNavigate();
    return (
        <>
            <h2>Order Details</h2>
            <OrderDetailsTable/>

            <h2>Update Order Details</h2>
            <form class="gform">
                <label>Product:</label>
                <select>
                    <option value="1">Krabby Patty</option>
                    <option value="2">Krabby Meal</option>
                    <option value="3">Salty Sea Dog</option>
                    <option value="4">Kelp Shake</option>
                </select>
                <label>Order Number</label>
                <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <label>Amount of Product: </label>
                <SelectQuantity/>
                <input type="submit"/>
            </form>

            <h2>Delete Order Details</h2>
            <form>
                <label>Product: </label>
                <select>
                    <option value="1">Krabby Patty</option>
                    <option value="2">Krabby Meal</option>
                    <option value="3">Salty Sea Dog</option>
                    <option value="4">Kelp Shake</option>
                </select>
                <label>Order Number: </label>
                <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <input type="submit"/>
            </form>

            <h2>Add to Order</h2>
            <label>Product:</label>
                <select>
                    <option value="1">Krabby Patty</option>
                    <option value="2">Krabby Meal</option>
                    <option value="3">Salty Sea Dog</option>
                    <option value="4">Kelp Shake</option>
                </select>
                <label>Order Number</label>
                <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <label>Amount of Product: </label>
                <SelectQuantity/>
                <input type="submit"/>
        </>
    )
}

export default OrderDetailsPage;