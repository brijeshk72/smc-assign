import React from "react";
import { Link } from "react-router-dom";
import DB from "../db.json";

export const Header = () => {
  return (
    <header className="section-header">
      <section className="header-main border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-4">
              <Link to="/" className="text-info">
                SMC Assignment
              </Link>
            </div>
            <div className="col-lg-6 col-sm-12">
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="widgets-wrap float-md-right">
                <div className="widget-header  mr-3">
                  <Link
                    to="/cart"
                    className="icon icon-sm rounded-circle border"
                  >
                    <i className="fa fa-shopping-cart"></i>
                  </Link>
                  <span className="badge badge-pill badge-danger notify">
                    {DB.carts.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};
