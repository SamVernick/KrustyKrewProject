import {Link} from 'react-router-dom';

function Navigation() {
    return (
        <nav className="app-nav">
            <Link to="/">Invoices</Link>
            <Link to="/Customers">Customers</Link>
            <Link to="/Orders">Orders</Link>
            <Link to="/OrderDetails">OrderDetails</Link>
            <Link to="/Products">Products</Link>
        </nav>
    );
}

export default Navigation;