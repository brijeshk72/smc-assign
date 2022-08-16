import React, { useState } from "react";
import { Link } from "react-router-dom";

const CartItem = ({ product, setTotal, total, removeCart }) => {
  const { id, title, image, price, category, size, color } = product;
  const [count, setCount] = useState(1);

  function cartDecrements() {
    setCount(count - 1);
    total = total - price;
    setTotal(total);
  }

  function cartIncrements() {
    setCount(count + 1);
    total = total + price;
    setTotal(total);
  }

  return (
    <tr>
      <td>
        <figure className="itemside">
          <div className="aside">
            <img src={image} className="img-sm" alt="item" />
          </div>
          <figcaption className="info">
            <Link to="#" className="title text-dark">
              {title}
            </Link>
            <p className="text-muted small">
              Size: {size}, Color: {color}, <br /> Category: {category}
            </p>
          </figcaption>
        </figure>
      </td>
      <td>
        <div className="quantity d-flex">
          <button
            onClick={cartDecrements}
            disabled={count <= 1}
            className="quantity__minus"
          >
            <span>-</span>
          </button>
          <input
            name="quantity"
            type="text"
            className="quantity__input"
            readOnly
            value={count}
          />
          <button onClick={cartIncrements} className="quantity__plus">
            <span>+</span>
          </button>
        </div>
      </td>
      <td>
        <div className="price-wrap">
          <var className="price">₹{(price * count).toFixed(2)}</var>
          <small className="text-muted"> ₹{price} each </small>
        </div>
      </td>
      <td className="text-right">
        <button onClick={() => removeCart(id)} className="btn btn-light">
          {" "}
          Remove
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
