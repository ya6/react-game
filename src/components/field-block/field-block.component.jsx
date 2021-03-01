import React, { Component } from "react";
import "./field-block.style.css";
import back_url from "../../assets/img/dig_bel_2+.png";
import med_box from "../../assets/img/med_box.png";
import c19 from "../../assets/img/c19.png";

class FieldBlock extends Component {
  ["canvasRef"] = React.createRef();
  canvas = null;
  context = null;
  compensation = 0;

  componentDidMount() {
    const { block, imageRatio, screenRatio } = this.props;
    const image = new Image();
    image.src = back_url;

    image.addEventListener("load", () => {
      this.canvas = this["canvasRef"].current;
      this.context = this.canvas.getContext("2d");
      this.canvas.width = "100" ;
      this.canvas.height = "100";

      this.context.drawImage(
        image,
        block.left * imageRatio,
        block.top * imageRatio,
        block.size * imageRatio,
        block.size * imageRatio,
        this.compensation,
        this.compensation,
        this.canvas.width - this.compensation,
        this.canvas.width - this.compensation
      );
    });
  }

  componentDidUpdate() {
    // console.log('block componentDidUpdate');
    const { block, imageRatio } = this.props;
    const context = this.canvas.getContext("2d");

    const image = new Image();
    image.src = back_url;

    image.addEventListener("load", () => {
      // block with numbers
      if (block.val > 0 && block.status === "opened") {
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        context.drawImage(
          image,
          block.left * imageRatio,
          block.top * imageRatio,
          block.size * imageRatio,
          block.size * imageRatio,
          this.compensation,
          this.compensation,
          this.canvas.width - this.compensation,
          this.canvas.width - this.compensation
        );

        context.font = block.size + "px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "black";
        context.shadowColor = "#bfbfbf";
        context.shadowOffsetX = 3;
        context.shadowOffsetY = 3;
        context.shadowBlur = 3;
        context.fillText(String(block.val), 50, 50);
      }

      //block empty
      if (block.val === 0 && block.status === "opened") {
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        context.filter = "contrast(200%)";

        context.drawImage(
          image,
          block.left * imageRatio,
          block.top * imageRatio,
          block.size * imageRatio,
          block.size * imageRatio,
          this.compensation,
          this.compensation,
          this.canvas.width - this.compensation,
          this.canvas.width - this.compensation
        );
      }

      //blok boom
      if (block.val === -1 && block.status === "blow") {
        const molecule = new Image();
        molecule.src = c19;

        molecule.addEventListener("load", () => {
          context.drawImage(
            molecule,
            0,
            0,
            this.canvas.width,
            this.canvas.height
          );
        });
      }

      //block select for med
      if (block.status === "hidden" && block.med) {
        const med = new Image();
        med.src = med_box;

        med.addEventListener("load", () => {
          context.drawImage(med, 0, 0, this.canvas.width, this.canvas.height);
        });
      }

      //block unselect for med
      if (block.status === "hidden" && !block.med) {
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        context.drawImage(
          image,
          block.left * imageRatio,
          block.top * imageRatio,
          block.size * imageRatio,
          block.size * imageRatio,
          this.compensation,
          this.compensation,
          this.canvas.width - this.compensation,
          this.canvas.width - this.compensation
        );
      }
    });
  }

  render() {
    const { block, leftClickHandler, rightClickHandler, screenRatio } = this.props;

    const _style = {
      width: block.size*screenRatio,
      height: block.size* screenRatio,
      left: block.left*screenRatio,
      top: block.top*screenRatio,
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
