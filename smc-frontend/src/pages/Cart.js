import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import CartSummery from "../components/CartSummery";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";

import DB from "../db.json";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const [cartProduct, setCartProduct] = useState([]);
  const [isRemove, setIsRemove] = useState(null);

  function removeCart(id) {
    const index = DB.carts.indexOf(id);
    if (index > -1) {
      DB.carts.splice(index, 1);
    }
    let objIndex = DB.products.findIndex((obj) => obj.id === id);
    DB.products[objIndex].isCart = false;
    setIsRemove(id);
  }
  useEffect(() => {
    let carts = DB.products.filter((item) => DB.carts.includes(item.id));
    let cartProd = DB.products
      .filter((item) => DB.carts.includes(item.id))
      .map(function (obj) {
        return obj.price;
      });

    setTotal(cartProd.reduce((a, b) => a + b, 0));
    setCartProduct(carts);
  }, [isRemove]);

  return (
    <Layout>
      <PageTitle title="Shopping cart" />

      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <main className="col-md-9">
              <div className="card">
                <table className="table table-borderless table-shopping-cart">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" width="120">
                        Quantity
                      </th>
                      <th scope="col" width="120">
                        Price
                      </th>
                      <th scope="col" className="text-right" width="200">
                        {" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProduct.map((product) => (
                      <CartItem
                        key={product.id}
                        setTotal={setTotal}
                        total={total}
                        product={product}
                        removeCart={removeCart}
                      />
                    ))}
                  </tbody>
                </table>

                <div className="card-body border-top">
                  {cartProduct.length > 0 && (
                    <Link to="/" className="btn btn-info float-md-right">
                      {" "}
                      Make Purchase <i className="fa fa-chevron-right"></i>{" "}
                    </Link>
                  )}

                  <Link to="/" className="btn btn-light">
                    {" "}
                    <i className="fa fa-chevron-left"></i> Continue shopping{" "}
                  </Link>
                </div>
              </div>

              <div className="alert alert-success mt-3">
                <p className="icontext">
                  <i className="icon text-success fa fa-truck"></i> Free
                  Delivery within 1-2 weeks
                </p>
              </div>
            </main>
            <aside className="col-md-3">
              <CartSummery total={total.toFixed(2)} />
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
