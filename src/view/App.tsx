import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, fetchProducts } from '../store/ProductSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  return (
    <div className="App">
      <h1>Checkout page</h1>
      <div className = "checkout-container">

      </div>
    </div>
  );
}

export default App;
