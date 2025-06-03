//will import data from database in the future
//for now it will be hard coded

function CustomersTable({ customers = [] }) {
    return (
        <table className="min-w-full border-2 border-black shadow-sm rounded-lg overflow-hidden mb-6">
            <thead className="border-2 border-black margin-2 padding-2">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Customer ID</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">First Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Last Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Total Money Spent</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-black">
                {customers.length > 0 ? (
                    customers.map(customer => (
                        <tr key={customer.id} className="group hover:bg-blue-400">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{customer.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{customer.firstName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{customer.lastName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{Number(customer.moneySpent).toFixed(2)}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">No customers found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default CustomersTable;