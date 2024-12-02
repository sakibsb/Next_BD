import logo from './logo.svg';
import './App.css';
import { Outlet, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

import BecomeSeller from './pages/BecomeSeller';
import AdminPanel from './pages/AdminPanel';
import SellerRequests from './pages/SellerRequests'


function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const [cartData, setCartData] = useState([]);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.data?.count);
  };

  /** user Details */
  useEffect(() => {
    fetchUserDetails();

    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart,
          cartData,
          setCartData,
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Routes> {/* Wrap Route inside Routes */}
            <Route path="/become-seller" element={<BecomeSeller />} />
            {/* Add other routes here if needed */}
            <Route path="/admin-panel" element={<AdminPanel />}>
              <Route path="seller-requests" element={<SellerRequests />} />
              {/* Add other nested routes if needed */}
            </Route>
          </Routes>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
