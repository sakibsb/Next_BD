import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayBDCurrency from '../helpers/displayCurrency';
import { MdDeleteSweep } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartViewProduct.url, {
      method: SummaryApi.addToCartViewProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      }
    });

    const responseData = await response.json();
    if (responseData.success) {
      context.setCartData(responseData.data);
    }
  };

  useEffect(() => {
    const handleLoading = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };
    handleLoading();
  }, []);

  const incQ = async (id, q) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        _id: id,
        quantity: q + 1
      })
    });

    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
    }
  };

  const decQ = async (id, q) => {
    if (q > 1) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          _id: id,
          quantity: q - 1
        })
      });

      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        _id: id,
      })
    });

    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const handlePayment = async () => {
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        cartItems: context.cartData
      })
    });

    const responseData = await response.json();
    if (responseData?.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData.id });
    }
  };

  const totalQ = context.cartData?.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
  const totalprize = context.cartData?.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0);

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', margin: '20px 0' }}>Your Shopping Cart</h1>
      <div style={{ textAlign: 'center', fontSize: '18px', margin: '10px 0' }}>
        {context.cartData?.length === 0 && !loading && (
          <p style={{ backgroundColor: '#f9f9f9', padding: '15px', color: '#999' }}>Your cart is empty!</p>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'space-between' }}>
        {/* View Product In User Cart */}
        <div style={{ flex: 1 }}>
          {loading ? (
            loadingCart.map((_, index) => (
              <div
                key={index}
                style={{
                  width: '100%',
                  height: '100px',
                  backgroundColor: '#eaeaea',
                  marginBottom: '10px',
                  borderRadius: '10px',
                  animation: 'pulse 2s infinite'
                }}
              />
            ))
          ) : (
            context.cartData?.map((product) => (
              <div
                key={product?._id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '20px',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                  padding: '15px',
                  position: 'relative'
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '5px'
                }}>
                  <img
                    src={product?.productId?.productImage[0]}
                    alt=""
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <h2 style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333',
                    lineHeight: '1.4'
                  }}>
                    {product?.productId?.productName}
                  </h2>
                  <p style={{ color: '#777', marginBottom: '10px' }}>{product?.productId?.category}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
                      {displayBDCurrency(product?.productId?.sellingPrice)}
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#444' }}>
                      Total: {displayBDCurrency(product?.productId?.sellingPrice * product?.quantity)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      className="bg-gray-200 text-gray-600 font-bold text-lg w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-300 hover:text-gray-800 transition duration-200"
                      onClick={() => decQ(product?._id, product?.quantity)}
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">{product?.quantity}</span>
                    <button
                      className="bg-gray-200 text-gray-600 font-bold text-lg w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-300 hover:text-gray-800 transition duration-200"
                      onClick={() => incQ(product?._id, product?.quantity)}
                    >
                      +
                    </button>
                  </div>

                </div>
                <MdDeleteSweep
                  onClick={() => deleteCartProduct(product?._id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    fontSize: '24px',
                    color: '#f00',
                    cursor: 'pointer'
                  }}
                />
              </div>
            ))
          )}
        </div>
        {/* Cart Summary */}
        <div style={{
          border: '1px solid #ddd',
          borderRadius: '10px',
          padding: '15px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Cart Summary</h3>
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>
            Total Quantity: <strong>{totalQ}</strong>
          </p>
          <p style={{ fontSize: '16px', marginBottom: '15px' }}>
            Total Price: <strong>{displayBDCurrency(totalprize)}</strong>
          </p>
          <button
            onClick={handlePayment}
            style={{
              display: 'block',
              width: '100%',
              padding: '12px 0',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#f57224',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              textAlign: 'center',
              marginTop: '10px',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#c9601a';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#f57224';
            }}
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;
