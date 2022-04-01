/*
 * Custom component for rendering a product
 */

import React from "react";
import { useDispatch,  } from "react-redux";
import { setProduct } from "../../store/CartSlice";
import { Product } from "../../types/Product";

import cartImg from "../../assets/cart.png";
import "./ProductDisplay.css";

export interface ProductProps {
  product: Product;
  rate: number;
  symbol: string;
}

const ProductDisplay: React.FC<ProductProps> = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="product">
      <h2>{props.product.name}</h2>
      <div className="product-price">
        <p>Price: </p>
        <p>{props.symbol}{(props.product.price * props.rate).toFixed(2)}</p>
      </div>
      <button
        onClick={() => {
          dispatch(setProduct({ product: props.product, quantity: 1 }));
        }}
      >
        <img src={cartImg} alt="img" />
        <p>Add to cart</p>
      </button>
    </div>
  );
};

export default ProductDisplay;
