import React from "react";

const NotFound = () => {
  return (
    <body className="d-md-flex align-items-center justify-content-center">
      <div className="container text-center p-5 p-md-0">
        <div className="row mb-4">
          <div className="col-md-4 m-auto">
            <figure>
              <img
                className="img-fluid"
                src="https://vetra.laborasyon.com/assets/svg/404.svg"
                alt="image"
              />
            </figure>
          </div>
        </div>
        <h2 className="display-6">Page not found</h2>
        <p className="text-muted my-4">
          The page you want to go is not currently available
        </p>
        <div className="d-flex gap-3 justify-content-center">
          <a href="/home" className="btn btn-primary">
            Home Page
          </a>
        </div>
      </div>
    </body>
  );
};

export default NotFound;
