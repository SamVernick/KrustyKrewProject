//will import data from database in the future
//for now it will be hard coded

function ProductsTable() {
    return (
        <table className="min-w-full border-2 border-black shadow-sm rounded-lg overflow-hidden">
            <thead className="border-2 border-black margin-2 padding-2">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Product ID</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Price</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-black">
                <tr className="group hover:bg-blue-400">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Krabby Patty</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">1.25</td>
                </tr>
                <tr className="group hover:bg-blue-400">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">2</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Krabby Meal</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">3.50</td>
                </tr>
                <tr className="group hover:bg-blue-400">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">3</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Salty Sea Dog</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">1.25</td>
                </tr>
                <tr className="group hover:bg-blue-400">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">4</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Kelp Shake</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">2.00</td>
                </tr>
            </tbody>
        </table>
    );
}

export default ProductsTable;