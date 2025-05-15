//will import data from database in the future
//for now it will be hard coded

function CustomersTable() {
    return (
        <table className="min-w-full border-2 border-black shadow-sm rounded-lg overflow-hidden">
            <thead className="border-2 border-black margin-2 padding-2">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Customer ID</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">First Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Last Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Total Money Spent</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-black">
                <tr className="group hover:bg-blue-400">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Mermaid</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Man</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">0.00</td>
                </tr>
                <tr className="group hover:bg-blue-400">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">2</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Barnacle</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Boy</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">0.00</td>
                </tr>
                <tr className="group hover:bg-blue-400">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">3</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Patrick</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Star</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">0.00</td>
                </tr>
                <tr className="group hover:bg-blue-400">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">4</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Bubble</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Bass</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">0.00</td>
                </tr>
            </tbody>
        </table>
    );
}

export default CustomersTable;