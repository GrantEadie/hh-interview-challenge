import React from "react";
import HHLogo from "../assets/hh-logo";

function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark justify-content-between">
        <div className="mr-auto my-2">
          <HHLogo fill="white" />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline ml-auto mr-3">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
      </nav>
    </>
  );
}

export default Header;
