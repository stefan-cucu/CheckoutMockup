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
import CartDisplay from "../components/cart/CartDisplay";

function App() {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const loaded = useSelector(getProductsLoaded);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="checkout-container">
        <h1>Checkout page</h1>
        <div className="flex-container">
          <div className="flex-item">
            {loaded &&
              products.map((product: Product) => (
                <ProductDisplay product={product} />
              ))}
          </div>
          <div className="flex-item">{loaded && <CartDisplay />}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
