import React from "react";

const PageTitle = ({ title }) => {
  return (
    <section className="section-pagetop bg">
      <div className="container">
        <h2 className="title-page">{title}</h2>
      </div>
    </section>
  );
};

export default PageTitle;
