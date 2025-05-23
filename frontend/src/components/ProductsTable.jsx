//will import data from database in the future
//for now it will be hard coded

function ProductsTable({ products = [] }) {
    return (
        <table className="min-w-full border-2 border-black shadow-sm rounded-lg overflow-hidden mb-6">
            <thead className="border-2 border-black margin-2 padding-2">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Product ID</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-b">Price</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-black">
                {products.length > 0 ? (
                    products.map(product => (
                        <tr key={product.id} className="group hover:bg-blue-400">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{product.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">{product.productName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black group-hover:text-white">${Number(product.price).toFixed(2)}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">No products found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default ProductsTable;