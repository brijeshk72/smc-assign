import React from "react";

const ProductCard = ({ product, addToCart }) => {
  const { id, image, title, price, mrp, isSale, isNew, isCart } = product;
  const discount = mrp - price;

  return (
    <div className="col-sm-4 col-md-3 box-product-outer">
      <div className="box-product">
        <div className="img-wrapper">
          <img alt="Product" src={image} style={{ height: 250 }} />
          <div className="tags">
            {isSale && (
              <span className="label-tags">
                <span className="label label-danger">Sale</span>
              </span>
            )}

            {isNew && (
              <span className="label-tags">
                <span className="label label-info">New</span>
              </span>
            )}
          </div>
        </div>
        <h6 className="text-info ">{title.substring(0, 30) + "..."}</h6>
        <div className="price">
          ₹{price}
          {discount > 0 && <span className="price-old">₹{mrp}</span>}
          {discount > 0 && <span className="price-down">-₹ {discount}</span>}
        </div>

        <button
          onClick={() => addToCart(id)}
          className="btn btn-info"
          disabled={isCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
