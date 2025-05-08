import './App.css';
import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import InvoicePage from './pages/InvoicesPage';
import OrderPage from './pages/OrdersPage';
import ProductPage from './pages/ProductsPage';
import CustomerPage from './pages/CustomersPage';
import Navigation from './components/Navigation';
import OrderDetailsPage from './pages/ViewOrderPage';


// Define the backend URL for API requests using environment variables
const backendURL = import.meta.env.VITE_API_BASE_URL;

function App() {

    // Set up a state variable `message` to store and display the backend response
    const [message, setMessage] = useState([]);

    // Get the data from the database
    const getData = async function () {
        if (message.length > 0) return; // Skip if data is already fetched
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL);
            
            // Convert the response into JSON format
            const rows = await response.json();
            
            // Update the message state with the response data
            setMessage(JSON.stringify(rows));
            
        } catch (error) {
          // If the API call fails, print the error to the console
          console.log(error);
        }
    };

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);

  return (
    <>
          <h1>MySQL Results:</h1>
          <p>{message}</p>

          <div className="app">
            <header>
              <h1>Welcome to the Krusty Krew Database!</h1>
            </header>
            <p>Use the Navigation to see the different datatables.</p>
            <Router>
              <Navigation/>
              <Routes>
                <Route path="/" element={<InvoicePage />}></Route>
                <Route path="/Customers" element={<CustomerPage />}></Route>
                <Route path="/Orders" element={<OrderPage />}></Route>
                <Route path="/OrderDetails" element={<OrderDetailsPage />}></Route>
                <Route path="/Products" element={<ProductPage />}></Route>
              </Routes>
            </Router>
          </div>
    </>
  );

} export default App;