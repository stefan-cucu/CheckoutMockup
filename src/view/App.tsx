/*
 * Main page component
 */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CurrencyList from "currency-list";
import { Convert } from "easy-currencies";
import {
  getProducts,
  fetchProducts,
  getProductsLoaded,
} from "../store/ProductSlice";
import ProductDisplay from "../components/product/ProductDisplay";
import { Product } from "../types/Product";
import CartDisplay from "../components/cart/CartDisplay";
import { getCartProducts } from "../store/CartSlice";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const cart = useSelector(getCartProducts);
  const loaded = useSelector(getProductsLoaded);

  const params = useParams();
  const codes = Object.keys(CurrencyList.getAll("en_US"));
  const currencies = CurrencyList.getAll("en_US");

  const [currency, setCurrency] = React.useState("USD");
  const [currencySymbol, setCurrencySymbol] = React.useState("$");
  const [currencyRate, setCurrencyRate] = React.useState(1);

  // Fetch products from server
  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Set default currency from URL
  React.useEffect(() => {
    if (!params.currency) return;
    if (codes.find((code) => code === params.currency?.toUpperCase())) {
      setCurrency(params.currency.toUpperCase());
    }
  }, []);

  // Set currency rate
  React.useEffect(() => {
    if (currency === "USD") {
      setCurrencySymbol("$");
      setCurrencyRate(1);
      return;
    }
    const symbol: string = String(currencies[currency].symbol);
    setCurrencySymbol(symbol);
    convertCurrency(1, currency).then((rate: number) => {
      setCurrencyRate(rate);
    });
  }, [currency]);

  // Function for converting currency
  const convertCurrency = async (price: number, currency: string) => {
    if (currency === "USD") {
      return price;
    }
    return await Convert(price).from("USD").to(currency);
  };

  return (
    <div className="App">
      <div className="checkout-container">
        <h1>Checkout page</h1>
        <div className="currency-container">
          <p>Currency: </p>
          <select
            onChange={(e) => {
              setCurrency(e.target.value);
            }}
          >
            {codes.map((code: string) => (
              <option selected={code === currency} key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-container">
          <div className="flex-item">
            {loaded &&
              products
                .filter(
                  (product: Product) =>
                    !cart.find((arr: any) => arr[0] == product.id && arr[1] > 0)
                )
                .map((product: Product) => (
                  <ProductDisplay
                    product={product}
                    rate={currencyRate}
                    symbol={currencySymbol}
                  />
                ))}
          </div>
          <div className="flex-item">
            <CartDisplay rate={currencyRate} symbol={currencySymbol} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
