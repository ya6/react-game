import { render } from "@testing-library/react";
import React, { Component } from "react";
import back_url from "../../assets/img/dig_bel_2+.png";
import "./removed.style.css";

class Removed extends Component {
  removed_canvasRef = React.createRef();

  componentDidMount() {
    const {
      field,
      imageRatio,
      fieldWidth,
      fieldHeight,
      imageWidth,
      size,
    } = this.props;

    const canvas = this.removed_canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = fieldWidth * size;
    canvas.height = fieldHeight * size;

    const image = new Image();
    image.src = back_url;
    image.addEventListener("load", () => {
    //  console.log("Removed @componentDidMount", this);

      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      for (let y = 0; y <fieldHeight; y++) {
        for (let x = 0; x < fieldWidth; x++) {
      //   context.strokeRect(x*size, y*size, size, size);
      let img_data = context.getImageData(x*size,y*size,1,1);
    console.log(img_data.data);

      context.strokeRect(x*size, y*size, 1, 1);

        }

    // const img_data = context.getImageData(0,0,1,1);
    // console.log(img_data);

     }

    
    let img_data = context.getImageData(0,0,1,1);
    console.log(img_data.data);
    img_data = context.getImageData(1,1,1,1);
    console.log(img_data.data);
    img_data = context.getImageData(100,100,1,1);
    console.log(img_data.data);
    img_data = context.getImageData(105,105,1,1);
    console.log(img_data.data);
    img_data = context.getImageData(505,405,1,1);
    console.log(img_data.data);



    });

    


  }

  render() {
    const { fieldWidth, fieldHeight, size } = this.props;

    const _style = {
      width: fieldWidth * size,
      height: fieldHeight * size,
    };

    return (
      <canvas
        style={_style}
        ref={this.removed_canvasRef}
        className="removed"
      ></canvas>
    );
  }
}

export default Removed;
