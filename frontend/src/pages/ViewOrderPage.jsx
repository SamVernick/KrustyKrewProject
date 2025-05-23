import OrderDetailsTable from "../components/OrderDetailsTable";
import SelectQuantity from "../components/SelectQuantity";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ResetButton from "../components/ResetButton";

function OrderDetailsPage() {
    //const nvaigate = useNavigate();
    return (
        <>
            <h1 className="text-xl font-medium underline underline-offset-2 mb-4 text-black">Order Details</h1>
            <OrderDetailsTable/>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Update Order Details</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4">
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Product:</label>
                        <select className="border border-black rounded-lg p-2 w-full bg-cyan-100">
                            <option value="1">Krabby Patty</option>
                            <option value="2">Krabby Meal</option>
                            <option value="3">Salty Sea Dog</option>
                            <option value="4">Kelp Shake</option>
                        </select>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Order Number</label>
                        <select className="border border-black rounded-lg p-2 w-full bg-cyan-100">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-lg font-medium text-black">Amount of Product: </label>
                    <SelectQuantity/>
                </div>
                
                <input type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer mt-2"/>
            </form>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Delete Order Details</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4">
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Product: </label>
                        <select className="border border-black rounded-lg p-2 w-full bg-cyan-100">
                            <option value="1">Krabby Patty</option>
                            <option value="2">Krabby Meal</option>
                            <option value="3">Salty Sea Dog</option>
                            <option value="4">Kelp Shake</option>
                        </select>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Order Number: </label>
                        <select className="border border-black rounded-lg p-2 w-full bg-cyan-100">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                </div>
                
                <input type="submit" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer mt-2"/>
            </form>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Add to Order</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4">
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Product:</label>
                        <select className="border border-black rounded-lg p-2 w-full bg-cyan-100">
                            <option value="1">Krabby Patty</option>
                            <option value="2">Krabby Meal</option>
                            <option value="3">Salty Sea Dog</option>
                            <option value="4">Kelp Shake</option>
                        </select>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Order Number</label>
                        <select className="border border-black rounded-lg p-2 w-full bg-cyan-100">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-lg font-medium text-black">Amount of Product: </label>
                    <SelectQuantity/>
                </div>
                
                <input type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer mt-2"/>
            </form>
            <ResetButton></ResetButton>
        </>
    )
}

export default OrderDetailsPage;