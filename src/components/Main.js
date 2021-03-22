import React, { useState, useEffect } from "react";
import Swatch from "./Swatch";
import Pagination from "./Pagination";

export default function Main() {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [colorsPerPage] = useState(10);

  const getData = () => {
    setLoading(true);
    fetch("./colors.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (res) {
        console.log(res);
        return res.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setColors(myJson);
        setLoading(false);
        return myJson;
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const indexOfLastColor = currentPage * colorsPerPage;
  const indexOfFirstColor = indexOfLastColor - colorsPerPage;
  const currentColors = colors.slice(indexOfFirstColor, indexOfLastColor);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  } else {
    return (
      <>
        <div className="main-grid-container">
          {currentColors.map((color, index) => (
            <Swatch hexCode={color.hex} key={index} />
          ))}
        </div>
          <div className="page-container">
            <Pagination
              colorsPerPage={colorsPerPage}
              totalColors={colors.length}
              paginate={paginate}
            />
          </div>
      </>
    );
  }
}
