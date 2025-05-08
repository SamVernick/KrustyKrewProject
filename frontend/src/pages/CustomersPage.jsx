import CustomersTable from "../components/CustomersTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function CustomersPage() {
    //const nvaigate = useNavigate();
    return (
        <>
            <h2>List of Customers</h2>
            <CustomersTable/>

            <h2>Update Customer</h2>
            <form>
            <label>Choose Customer to Update: </label>
                <select>
                    <option>Mermaid Man</option>
                    <option>Barnacle Boy</option>
                    <option>Patrick Star</option>
                    <option>Bubble Bass</option>
                </select>
                <label>First Name: </label>
                    <input type="text" />
                <label>Last Name: </label>
                    <input type="text" />
                <input type="submit"/>
            </form>

            <h2>Delete Customer</h2>
            <form>
                <label>Choose a Customer to Delete: </label>
                <select>
                    <option>Mermaid Man</option>
                    <option>Barnacle Boy</option>
                    <option>Patrick Star</option>
                    <option>Bubble Bass</option>
                </select>
                <input type="submit" />
            </form>
        </>
    )
}

export default CustomersPage;