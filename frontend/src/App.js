import './App.css';
import ToolBar from './pages/components/NavBarComponent.jsx';
import AllProducts from './pages/AllProducts';
import PurchaseOrders from './pages/PurchaseOrder';
import LoginForm from './pages/LoginPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SelectedItemsProvider } from './pages/components/SelectedItemsComponent';
import PrivateRoute from './PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyPurchaseOrdersComponent from './pages/MyPurchaseOrders';
import Homepage from './pages/Homepage';
import {useAuth} from './AuthContext'

function App() {
  const { isLoggedIn } = useAuth(); // Assuming you have a function to check if the user is logged in

  console.log('App rendering');
  return (
    <div className="App">
      <ToastContainer />
        <Router>
          <header>
            <ToolBar />
          </header>
          <main>
            <Routes>
              <Route path="/home" element={<Homepage />} />
              <Route
                path="/all-products"
                element={
                  <SelectedItemsProvider>
                    <PrivateRoute>
                      <AllProducts />
                    </PrivateRoute>
                  </SelectedItemsProvider>
                }
              />
              <Route
                path="/purchase-order"
                element={
                  <SelectedItemsProvider>
                    <PrivateRoute>
                      <PurchaseOrders />
                    </PrivateRoute>
                  </SelectedItemsProvider>
                }
              />
              <Route path="/my-purchase-orders" element={<PrivateRoute><MyPurchaseOrdersComponent /></PrivateRoute>} />
              <Route
                path="/login"
                element={isLoggedIn ? <Navigate to="/all-products" /> : <SelectedItemsProvider><LoginForm /></SelectedItemsProvider>}
              />
              <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
          </main>
          <footer className="bg-dark text-light text-center py-3 border-top mt-4">
            <p>&copy; {new Date().getFullYear()} Miguel Fenech | CS50 Final Submission</p>
          </footer>
        </Router>
    </div>
  );
}

export default App;
