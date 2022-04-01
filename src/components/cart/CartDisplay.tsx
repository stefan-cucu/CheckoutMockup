/*
 * Custom component for rendering cart info
 */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartProducts, ICart, setProduct } from "../../store/CartSlice";
import { getProducts } from "../../store/ProductSlice";
import { Product } from "../../types/Product";

import "./CartDisplay.css";

const CartDisplay: React.FC = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(getCartProducts);
  const products = useSelector(getProducts);

  // Calculate total price
  const totalPrice = () => {
    let total = 0;
    cartProducts.forEach((arr) => {
      const product = products.find((entity: Product) => entity.id == arr[0]);
      total += product.price * arr[1];
    });
    return total;
  };

  // Display one product row
  const CartRow: React.FC<ICart> = (props) => {
    return (
      <div className="grid-item">
        <h4>{props.product.name}</h4>
        <input
          type="number"
          value={props.quantity}
          onChange={(e) => {
            dispatch(
              setProduct({
                product: props.product,
                quantity: parseInt(e.target.value),
              })
            );
          }}
        />
        <p>${(props.product.price * props.quantity).toFixed(2)}</p>
      </div>
    );
  };

  return (
    <div className="cart-container">
      <div className="grid-container">
        <h2>Products in your shopping cart</h2>
        <div className="grid-item grid-head">
          <h3>Product</h3>
          <h3>Quantity</h3>
          <h3>Price</h3>
        </div>
        {cartProducts.map((arr: any) => (
          <CartRow
            product={products.find((product: Product) => {
              return product.id == arr[0];
            })}
            quantity={arr[1]}
          />
        ))}
        <p className="cart-total">Total: ${totalPrice()}</p>
      </div>
    </div>
  );
};

export default CartDisplay;
