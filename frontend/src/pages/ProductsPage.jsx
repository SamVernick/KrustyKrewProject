import ProductsTable from "../components/ProductsTable";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ResetButton from "../components/ResetButton";

function ProductsPage() {
    //const nvaigate = useNavigate();
    return (
        <>
            <h1 className="text-xl font-medium underline underline-offset-2 mb-4 text-black">List of Products</h1>
            <ProductsTable/>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Create New Product</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4">
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">New Product Name: </label>
                        <input type="text" className="border border-black rounded-lg p-2 w-full bg-cyan-100" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Price: </label>
                        <input type="text" className="border border-black rounded-lg p-2 w-full bg-cyan-100" />
                    </div>
                </div>
                
                <input type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer mt-2"/>
            </form>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Update a Product</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4">
                <div className="space-y-2">
                    <label className="text-lg font-medium text-black">Old Product Name: </label>
                    <select className="border border-black rounded-lg p-2 bg-cyan-100">
                        <option>Krabby Patty</option>
                        <option>Krabby Meal</option>
                        <option>Salty Sea Dog</option>
                        <option>Kelp Shake</option>
                    </select>
                </div>
                
                <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">New Product Name: </label>
                        <input type="text" className="border border-black rounded-lg p-2 w-full bg-cyan-100" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <label className="text-lg font-medium text-black">Price: </label>
                        <input type="text" className="border border-black rounded-lg p-2 w-full bg-cyan-100" />
                    </div>
                </div>
                
                <input type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer mt-2"/>
            </form>

            <h2 className="text-xl font-medium underline underline-offset-2 mb-2 mt-6 text-black">Delete a Product</h2>
            <form className="border-2 border-black rounded-lg p-4 space-y-4">
                <div className="flex flex-col space-y-2">
                    <label className="text-lg font-medium text-black">Delete Product: </label>
                    <select className="border border-black rounded-lg p-2 bg-cyan-100">
                        <option>Krabby Patty</option>
                        <option>Krabby Meal</option>
                        <option>Salty Sea Dog</option>
                        <option>Kelp Shake</option>
                    </select>
                </div>
                <input type="submit" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer mt-2"/>
            </form>
            <ResetButton></ResetButton>
        </>
    )
}

export default ProductsPage;