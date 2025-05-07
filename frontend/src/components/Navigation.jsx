import {Link} from 'react-router-dom';

function Navigation() {
    return (
        <nav className="app-nav">
            <Link to="/">Invoices</Link>
            {/* <Link to="/">Invoices</Link>
            <Link to="/">Invoices</Link> */}
        </nav>
    )
}