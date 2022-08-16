import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import ProductCard from "../components/ProductCard";

import DB from "../db.json";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [addProduct, setAddProduct] = useState(null);

  const addToCart = (id) => {
    DB.carts.push(id);
    let objIndex = DB.products.findIndex((obj) => obj.id === id);
    DB.products[objIndex].isCart = true;

    setAddProduct(id);
  };
  useEffect(() => {
    setProducts(DB.products);
    return () => {
      setAddProduct(null);
    };
  }, [addProduct]);

  return (
    <Layout>
      <PageTitle title="Product List" />

      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            {products.length > 0 &&
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
