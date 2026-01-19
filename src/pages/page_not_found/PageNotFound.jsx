import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

function PageNotFound() {
  return (
    <div>
      <div>The page you are looking for is not found</div>
      <p>Do you want to return Home?</p>
      <Link to={ROUTES.ROOT}>Home</Link>
    </div>
  );
}

export default PageNotFound;
