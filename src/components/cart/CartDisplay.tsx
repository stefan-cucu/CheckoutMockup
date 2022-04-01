/*
 * Custom component for rendering cart info
 */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Convert } from "easy-currencies";
import { getCartProducts, ICart, setProduct } from "../../store/CartSlice";
import { getProducts } from "../../store/ProductSlice";
import { Product } from "../../types/Product";
import DescriptionPopup from "../descriptionPopup/DescriptionPopup";

import infoImg from "../../assets/info_icon.svg";
import "./CartDisplay.css";

const CartDisplay: React.FC<{ rate: number; symbol: string }> = (props) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(getCartProducts);
  const products = useSelector(getProducts);

  const currencyRate = props.rate;
  const symbol = props.symbol;

  // Calculate total price
  const totalPrice = () => {
    let total = 0;
    cartProducts.forEach((arr) => {
      const product = products.find((entity: Product) => entity.id == arr[0]);
      total += product.price * arr[1];
    });
    return total * currencyRate;
  };

  // Display one product row
  const CartRow: React.FC<ICart> = (props) => {
    const [showDescription, setShowDescription] = React.useState(false);
    const infoRef: any = React.useRef(null);
    return (
      <div className="grid-item">
        <div className="grid-title">
          <h4>{props.product.name}</h4>
          <img
            src={infoImg}
            alt="info"
            ref={infoRef}
            onMouseEnter={() => {
              setShowDescription(true);
            }}
            onMouseLeave={() => {
              setShowDescription(false);
            }}
          />
        </div>
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
        <p>
          {symbol}
          {(props.product.price * props.quantity * currencyRate).toFixed(2)}
        </p>
        {infoRef.current && (
          <DescriptionPopup
            description={props.product.description}
            active={showDescription}
            top={infoRef.current.offsetTop - 15}
            left={infoRef.current.offsetLeft + 30}
          />
        )}
      </div>
    );
  };

  return (
    <div className="cart-container">
      <div className="grid-container">
        <h2>
          {cartProducts.find((arr: any) => arr[1] > 0)
            ? "Products in your shopping cart"
            : "No products in your shopping cart"}
        </h2>
        {cartProducts.find((arr: any) => arr[1] > 0) && (
          <>
            <div className="grid-item grid-head">
              <h3>Product</h3>
              <h3>Quantity</h3>
              <h3>Price</h3>
            </div>
            {cartProducts
              .filter((arr: any) => arr[1] > 0)
              .map((arr: any) => (
                <CartRow
                  product={products.find((product: Product) => {
                    return product.id == arr[0];
                  })}
                  quantity={arr[1]}
                />
              ))}
            <p className="cart-total">
              Total: {symbol}
              {totalPrice().toFixed(2)}
            </p>
            <button
              onClick={() => {
                products.forEach((product: Product) => {
                  dispatch(
                    setProduct({
                      product: product,
                      quantity: 0,
                    })
                  );
                });
              }}
            >
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDisplay;
