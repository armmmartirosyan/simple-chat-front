import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

export default function NotFound() {
  return (
    <div className="not_found_wrapper">
      <h1>Page not found</h1>
      <Link to="/">Go back</Link>
    </div>
  );
}
