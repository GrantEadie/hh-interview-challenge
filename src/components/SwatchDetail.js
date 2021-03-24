import { useState, useEffect } from "react";
import Swatch from "./Swatch";

export default function SwatchDetail(props) {
  const { hexCode, allColors, handleSwatchClick } = props;

  const [similarColors, setSimilarColors] = useState([]);

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

  useEffect(() => {
    const findShades = (h, all) => {
      const inputColor = hexConvert(h);

      let output = [];

      for (let i = 0; i < all.length; i++) {
        const convertedColor = hexConvert(all[i].hex);
        if (output.length >= 10) {
          break;
        }

        if (
          inputColor.b > convertedColor.b - 60 &&
          inputColor.b < convertedColor.b + 60 &&
          inputColor.r > convertedColor.r - 10 &&
          inputColor.r < convertedColor.r + 10 &&
          inputColor.g > convertedColor.g - 10 &&
          inputColor.g < convertedColor.g + 10
        ) {
          output.push(all[i]);
        } else if (
          inputColor.b > convertedColor.b - 10 &&
          inputColor.b < convertedColor.b + 10 &&
          inputColor.r > convertedColor.r - 60 &&
          inputColor.r < convertedColor.r + 60 &&
          inputColor.g > convertedColor.g - 10 &&
          inputColor.g < convertedColor.g + 10
        ) {
          output.push(all[i]);
        } else if (
          inputColor.b > convertedColor.b - 10 &&
          inputColor.b < convertedColor.b + 10 &&
          inputColor.r > convertedColor.r - 10 &&
          inputColor.r < convertedColor.r + 10 &&
          inputColor.g > convertedColor.g - 60 &&
          inputColor.g < convertedColor.g + 60
        ) {
          output.push(all[i]);
        }
      }

      setSimilarColors(output);
    };
    
    findShades(hexCode, allColors);
  }, [hexCode, allColors]);

  return (
    <>
      <div className="swatch-detail-hero">
        <div className="swatch-color" style={{ background: hexCode }}></div>
        <p>{hexCode}</p>
      </div>
      <div className="swatch-detail-sample-container">
        {/* <div className="swatch-container" style={{ marginLeft: "0px" }}>
          <div className="swatch-color" style={{ background: hexCode }}></div>
          <p>{hexCode}</p>
        </div> */}
        {similarColors.map((color, index) => (
          <Swatch
            hexCode={color.hex}
            key={index}
            handleSwatchClick={() => handleSwatchClick(color)}
          />
        ))}
      </div>
    </>
  );
}
