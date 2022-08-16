import React, { useState } from "react";

const Coupon = () => {
  const [coupon, setCoupon] = useState(0);
  function applyCoupon(e) {
    e.preventDefault();
    console.log("coupon : ", coupon);
  }
  return (
    <div className="card mb-3">
      <div className="card-body">
        <form>
          <div className="form-group">
            <label>Have coupon?</label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                name="coupon"
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code"
              />
              <span className="input-group-append">
                <button onClick={applyCoupon} className="btn btn-primary">
                  Apply
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Coupon;
