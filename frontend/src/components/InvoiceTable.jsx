

function InvoiceTable({ invoices = []}) {
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
                {invoices.length > 0 ? (
                    invoices.map(invoice => (
                        <tr key={invoice.id} className="group hover:bg-blue-400">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{invoice.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{invoice.orderID}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{invoice.firstName} {invoice.lastName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{Number(invoice.orderTotal).toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{new Date(invoice.saleDate).toISOString().slice(0,10)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{invoice.paid}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">No invoices found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default InvoiceTable;