

function OrdersTable({ orders = []}) {
    return (
        <table className="min-w-full border-2 border-black shadow-sm rounded-lg overflow-hidden mb-6">
            <thead className="border-2 border-black margin-2 padding-2">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Order Number</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Customer Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Total</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-black">
                {orders.length > 0 ? (
                    orders.map(order => (
                        <tr key={order.id} className="group hover:bg-blue-400">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{order.firstName} {order.lastName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{Number(order.orderTotal).toFixed(2)}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">No orders found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default OrdersTable;