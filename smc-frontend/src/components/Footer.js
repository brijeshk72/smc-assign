import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="section-footer border-top padding-y">
      <div className="container">
        <p className="float-md-right">
          &copy; Copyright 2022 All rights reserved
        </p>
        <p>
          <Link to="#" className="text-info">Terms and conditions</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
