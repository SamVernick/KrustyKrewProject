import './App.css';
import { ResetProvider } from './context/ResetContext';
import { useState, useEffect, useRef } from 'react';  // Added useRef for audio and video
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoicePage from './pages/InvoicesPage';
import OrderPage from './pages/OrdersPage';
import ProductPage from './pages/ProductsPage';
import CustomerPage from './pages/CustomersPage';
import Navigation from './components/Navigation';
import OrderDetailsPage from './pages/ViewOrderPage';
import krustyKrabBg from './assets/krustyKrab.jpg';


// Define the backend URL for API requests using environment variables
const backendURL = import.meta.env.VITE_API_BASE_URL;

function App() {
    // Set up a state variable `message` to store and display the backend response
    const [message, setMessage] = useState([]);
    // State to track if user has entered the app
    const [hasEntered, setHasEntered] = useState(false);
    // Reference to the audio element
    const audioRef = useRef(null);

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

    // Handle the enter button click
    const handleEnterClick = (e) => {
        // Prevent default behavior
        if (e) {
            e.preventDefault();
        }
        
        // Play the audio
        if (audioRef.current) {
            audioRef.current.volume = 0.3; // Set volume to 30%
            audioRef.current.play();
        }
        
        // After a delay to allow the audio to start, set hasEntered to true
        // We'll use the video's duration as a guide
        setTimeout(() => {
            setHasEntered(true);
        }, 1000);
    };

  return (
    <>
    <ResetProvider>
        <div className="min-h-screen bg-cover bg-center bg-fixed relative" style={{ backgroundImage: `url(${krustyKrabBg})` }}>
          {/* Audio element for SpongeBob sound */}
          <audio ref={audioRef} src="/sounds/spongebob_entrance.mp3" preload="auto"></audio>
          
          {!hasEntered && (
            <div className="absolute inset-0 flex items-top justify-center">
              <h1 className="text-4xl font-bold text-black mt-20 ml-18">Click Enter To Begin!</h1>
            <button 
              onClick={(e) => handleEnterClick(e)}
              className="absolute bottom-15 right-72 w-32 h-24 opacity-0 cursor-pointer rounded-full transition-opacity border-2 border-white text-white font-bold"
              aria-label="Enter the Krusty Krab"
            >
              Enter
            </button>
            </div>
          )}
          
          {hasEntered && (
            <div className="container px-4 py-8 mx-auto">
              <header className="mb-8">
                <h1 className="mb-4 text-3xl font-bold text-center">Welcome to the Krusty Krew Database!</h1>
              </header>
              <p className="mb-6 text-center">Use the Navigation to see the different datatables.</p>
              <Router>
                <Navigation/>
                <div className="p-4 mt-4 bg-gradient-to-b from-cyan-100 to-blue-400 rounded-lg shadow">
                <Routes>
                  <Route path="/" element={<InvoicePage />}></Route>
                  <Route path="/Customers" element={<CustomerPage />}></Route>
                  <Route path="/Orders" element={<OrderPage />}></Route>
                  <Route path="/OrderDetails" element={<OrderDetailsPage />}></Route>
                  <Route path="/Products" element={<ProductPage />}></Route>
                </Routes>
                </div>
              </Router>
            </div>
          )}
        </div>
      </ResetProvider>
    </>
  );
}

export default App;