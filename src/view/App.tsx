/*
 * Main page component
 */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  fetchProducts,
  getProductsLoaded,
} from "../store/ProductSlice";
import ProductDisplay from "../components/product/ProductDisplay";
import { Product } from "../types/Product";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const loaded = useSelector(getProductsLoaded);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Checkout page</h1>
      <div className="checkout-container">
        {loaded &&
          products.map((product: Product) => (
            <ProductDisplay product={product} />
          ))}
      </div>
    </div>
  );
}

export default App;
