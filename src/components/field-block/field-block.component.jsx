import React, { Component } from "react";
import "./field-block.style.css";
import back_url from "../../assets/img/dig_bel_2+.png";

class FieldBlock extends Component {
  // constructor(props) {
  //   super(props);

  //   this.canvasRef = React.createRef();
  // }

  ["canvasRef"] = React.createRef();
  canvas = null;
  context = null;

  componentDidMount() {
    //  console.log(this.props.block);

    const { block, imageRatio } = this.props;

    console.log(imageRatio);

    const image = new Image();
    image.src = back_url;

    image.addEventListener("load", () => {
      this.canvas = this["canvasRef"].current;
      this.context = this.canvas.getContext("2d");
      this.canvas.width = '100';
    this.canvas.height = '100';

      console.log("load");

      // void ctx.drawImage(image, dx, dy);
      // void ctx.drawImage(image, dx, dy, dWidth, dHeight);
      //  void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

      this.context.drawImage(
        image,
        block.left * imageRatio,
        block.top * imageRatio,
        block.size * imageRatio,
        block.size * imageRatio,
        0,
        0,
        this.canvas.width,
        this.canvas.width,
      );
    });

    

    // this.context.rect(0, 0, 300, 150);
    // this.context.fill();
  }

  updateCanvas = (block) => {
    console.log(block);
    //console.log(this.canvas.getContext("2d"));
    const context = this.canvas.getContext("2d");
    //  context.fillStyle = "#fff5f5";
    // context.rect(10, 10, 50, 50);
    // context.fill();
    context.font = block.size/2 + "px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "black";
    //  context.fillText(block.val, block.width / 2, block.height / 2);

    context.fillText(String(block.val), 50, 50);
  };

  render() {
    const { block, leftClickHandler, rightClickHandler, imageRatio } = this.props;


    if (block.status === "opened") {
      this.updateCanvas(block);
    }

    const _style = {
      width: block.size,
      height: block.size,
      left: block.left,
      top: block.top,
    };

    return (
      <canvas
        style={_style}
        ref={this["canvasRef"]}
        id={`${block.y}-${block.x}`}
        className="field-block"
        onClick={() => leftClickHandler(block)}
        onContextMenu={(e) => rightClickHandler(e, block)}
      ></canvas>
    );
  }
}

export default FieldBlock;
