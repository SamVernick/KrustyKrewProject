//will import data from database in the future
//for now it will be hard coded

function InvoiceTable() {
    return (
        <table className="min-w-full border-2 border-black shadow-sm rounded-lg overflow-hidden mb-6">
            <thead className="border-2 border-black margin-2 padding-2">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Invoice Number</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Order Number</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Customer Name</th> 
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Date of Sale</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Paid</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-black">
                <tr className="group hover:bg-blue-400">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Bubble Bass</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">10.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">2025-05-01</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">0</td>
                </tr>
                <tr className="group hover:bg-blue-400">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">2</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">3</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Patrick Star</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">14.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">2024-06-27</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">0</td>
                </tr>
                <tr className="group hover:bg-blue-400">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">3</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">2</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">Mermaid Man</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">20.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">2023-12-19</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">0</td>
                </tr>
            </tbody>
        </table>
    );
}

export default InvoiceTable;