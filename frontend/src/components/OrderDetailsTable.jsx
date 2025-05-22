//will import data from database in the future
//for now it will be hard coded

function OrderDetailsTable() {
    return (
        <table className="min-w-full border-2 border-black shadow-sm rounded-lg overflow-hidden mb-6">
            <thead className="border-2 border-black margin-2 padding-2">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Order Detail Number</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Order Number</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Order Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Total</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-black">
                <tr className="group hover:bg-blue-400">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Krabby Patty</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">4</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">5.00</td>
                </tr>
                <tr className="group hover:bg-blue-400">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">2</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Salty Sea Dog</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">4</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">5.00</td>
                </tr>
                <tr className="group hover:bg-blue-400">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">3</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Kelp Shake</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">2</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">10</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">20.00</td>
                </tr>
                <tr className="group hover:bg-blue-400">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">4</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Krabby Meal</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">3</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">4</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">14.00</td>
                </tr>
            </tbody>
        </table>
    );
}

export default OrderDetailsTable; 
