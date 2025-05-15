import {Link} from 'react-router-dom';

function Navigation() {
    return (
        <nav className="flex items-center justify-center p-2.5 mx-auto my-2.5 bg-cyan-100 border border-black rounded-lg w-fit">
        <Link to="/" className="px-4 py-2 mx-1 text-gray-800 transition-all duration-300 ease-in-out border border-black rounded hover:bg-blue-400 hover:border-gray-500 hover:-translate-y-0.5 hover:shadow-sm hover:text-white">Invoices</Link>
        <Link to="/Customers" className="px-4 py-2 mx-1 text-gray-800 transition-all duration-300 ease-in-out border border-black rounded hover:bg-blue-400 hover:border-gray-500 hover:-translate-y-0.5 hover:shadow-sm hover:text-white">Customers</Link>
        <Link to="/Orders" className="px-4 py-2 mx-1 text-gray-800 transition-all duration-300 ease-in-out border border-black rounded hover:bg-blue-400 hover:border-gray-500 hover:-translate-y-0.5 hover:shadow-sm hover:text-white">Orders</Link>
        <Link to="/OrderDetails" className="px-4 py-2 mx-1 text-gray-800 transition-all duration-300 ease-in-out border border-black rounded hover:bg-blue-400 hover:border-gray-500 hover:-translate-y-0.5 hover:shadow-sm hover:text-white">OrderDetails</Link>
        <Link to="/Products" className="px-4 py-2 mx-1 text-gray-800 transition-all duration-300 ease-in-out border border-black rounded hover:bg-blue-400 hover:border-gray-500 hover:-translate-y-0.5 hover:shadow-sm hover:text-white">Products</Link>
    </nav>
    );
}

export default Navigation;