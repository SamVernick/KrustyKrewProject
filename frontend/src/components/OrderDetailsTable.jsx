

function OrderDetailsTable({ orderDetails = []}) {
    return (
        <table className="min-w-full border-2 border-black shadow-sm rounded-lg overflow-hidden mb-6">
            <thead className="border-2 border-black margin-2 padding-2">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Order Detail ID</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Order Number</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Order Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Total</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-black">
                {orderDetails.length > 0 ? (
                    orderDetails.map(detail => (
                        <tr key={detail.id} className="group hover:bg-blue-400">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{detail.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{detail.productName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{detail.orderID}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{detail.orderQuantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{Number(detail.priceTotal).toFixed(2)}</td>

                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">No order details found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default OrderDetailsTable; 
