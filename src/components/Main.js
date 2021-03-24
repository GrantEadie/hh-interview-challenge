import React, { useState, useEffect } from "react";
import Swatch from "./Swatch";
import Pagination from "./Pagination";
import SwatchDetail from "./SwatchDetail";
import Sidebar from "./Sidebar"

export default function Main(props) {

  const [colors, setColors] = useState([]);
  const [sortingColor, setSortingColor] = useState([])
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [colorsPerPage] = useState(20);
  const [toggleView, setToggleView] = useState(false);
  const [currentColor, setCurrentColor] = useState(null);

  const hexConvert = (h) => {
    var colorCode = {
      r: 0,
      g: 0,
      b: 0,
    };

    if (h.length === 4) {
      colorCode.r = parseInt(h[1] + h[1], 16);
      colorCode.g = parseInt(h[2] + h[2], 16);
      colorCode.b = parseInt(h[3] + h[3]);

      // 6 digits
    } else if (h.length === 7) {
      colorCode.r = parseInt(h[1] + h[2], 16);
      colorCode.g = parseInt(h[3] + h[4], 16);
      colorCode.b = parseInt(h[5] + h[6], 16);
    }

    return colorCode;
  };

  const findColor = (colorString, colors) => {
    let colorArray = colors;

    if (colorString === "red") {
      const result = colorArray.filter(
        (color) =>
          hexConvert(color.hex).r > 200 &&
          hexConvert(color.hex).g < 70 &&
          hexConvert(color.hex).b < 70
      );
      return result;
    } else if (colorString === "orange") {
      const result = colorArray.filter(
        (color) =>
          hexConvert(color.hex).r > 220 &&
          hexConvert(color.hex).g >= 125 &&
          hexConvert(color.hex).b < 70 &&
          hexConvert(color.hex).g <= 200
      );
      return result;
    } else if (colorString === "yellow") {
      const result = colorArray.filter(
        (color) =>
          hexConvert(color.hex).r > 220 &&
          hexConvert(color.hex).g > 200 &&
          hexConvert(color.hex).b < 100
      );
      return result;
    } else if (colorString === "green") {
      const result = colorArray.filter(
        (color) =>
          hexConvert(color.hex).r < 190 &&
          hexConvert(color.hex).g > 200 &&
          hexConvert(color.hex).b < 190
      );
      return result;
    } else if (colorString === "blue") {
      const result = colorArray.filter(
        (color) =>
          hexConvert(color.hex).r < 120 &&
          hexConvert(color.hex).g < 255 &&
          hexConvert(color.hex).b > 200
      );
      return result;
    } else if (colorString === "purple") {
      const result = colorArray.filter(
        (color) =>
          hexConvert(color.hex).r > 130 &&
          hexConvert(color.hex).g < 120 &&
          hexConvert(color.hex).b > 130
      );
      return result;
    } else if (colorString === "brown") {
      const result = colorArray.filter(
        (color) =>
          hexConvert(color.hex).r > 128 &&
          Math.abs(
            hexConvert(color.hex).r -
              (hexConvert(color.hex).g + hexConvert(color.hex).b)
          ) < 130 &&
          Math.abs(hexConvert(color.hex).b - hexConvert(color.hex).g) < 20
      );

      return result;
    } else if (colorString === "grey") {
      const result = colorArray.filter(
        (color) =>
          Math.abs(hexConvert(color.hex).b - hexConvert(color.hex).g) < 15 &&
          Math.abs(hexConvert(color.hex).r - hexConvert(color.hex).g) < 15 &&
          Math.abs(hexConvert(color.hex).r - hexConvert(color.hex).b) < 15
      );

      return result;
    } else {
      return colorArray;
    }
  };

  const getData = () => {
    setLoading(true);
    fetch("./colors.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (myJson) {
        setColors(myJson);
        setLoading(false);
        return myJson;
      });
  };

  const handleSwatchClick = (color) => {
    setToggleView(true);
    setCurrentColor(color);
  };

  const handleChangeSort = (colorString) => {
    setSortingColor(colorString)
  }
  
  const handleRandomColor = () => {
    const random = Math.floor(Math.random() * Math.floor(colors.length))
    setCurrentColor(colors[random]);
    setToggleView(true);
  }

  useEffect(() => {
    getData();
  }, []);

  const indexOfLastColor = currentPage * colorsPerPage;
  const indexOfFirstColor = indexOfLastColor - colorsPerPage;
  const sortedColors = findColor(sortingColor, colors);
  const currentColors = sortedColors.slice(indexOfFirstColor, indexOfLastColor);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (toggleView) {
    return (
      <>
      <Sidebar handleChangeSort={handleChangeSort} handleRandomColor={handleRandomColor} />
        <button
          onClick={() => setToggleView(false)}
          className="btn btn-outline-dark mb-5"
        >
          back
        </button>
        <SwatchDetail
          hexCode={currentColor.hex}
          allColors={colors}
          handleSwatchClick={(color) => handleSwatchClick(color)}
        />
      </>
    );
  } else {
    if (loading) {
      return (
        <>
        <Sidebar handleChangeSort={handleChangeSort} handleRandomColor={handleRandomColor} />
          <p>Loading...</p>
        </>
      );
    } else {
      return (
        <>
        <Sidebar handleChangeSort={handleChangeSort} handleRandomColor={handleRandomColor} />
          <div className="main-grid-container">
            {currentColors.map((color, index) => (
              <Swatch
                hexCode={color.hex}
                key={index}
                handleSwatchClick={() => handleSwatchClick(color)}
              />
            ))}
          </div>
          <div className="page-container">
            <Pagination
              colorsPerPage={colorsPerPage}
              totalColors={sortedColors.length}
              paginate={paginate}
            />
          </div>
        </>
      );
    }
  }
}
