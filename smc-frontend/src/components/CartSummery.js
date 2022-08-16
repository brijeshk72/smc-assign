import React from "react";

const CartSummery = ({ total }) => {
  return (
    <div className="card">
      <div className="card-body">
        <dl className="dlist-align">
          <dt>Total price:</dt>
          <dd className="text-right"> ₹ {total}</dd>
        </dl>
        <dl className="dlist-align">
          <dt>Total:</dt>
          <dd className="text-right  h5">
            <strong> ₹{total}</strong>
          </dd>
        </dl>
        <hr />
        <p className="text-center mb-3">
          <img
            src="assets/images/misc/payments.png"
            height="26"
            alt="payments"
          />
        </p>
      </div>
    </div>
  );
};

export default CartSummery;
