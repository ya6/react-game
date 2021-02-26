import React, { Component } from "react";
import "./field-block.style.css";

class FieldBlock extends Component {
  // constructor(props) {
  //   super(props);

  //   this.canvasRef = React.createRef();
  // }

  ["canvasRef"] = React.createRef();
  canvas = null;
  context = null;

  componentDidMount() {
    //console.log( ['canvasRef']);
    this.canvas = this["canvasRef"].current;
    //console.log(this.canvas);
    this.context = this.canvas.getContext("2d");
    //   console.log(this.canvas);
    // console.log(this.context);

    this.context.rect(0, 0, 300, 150);
    this.context.fill();
    //  console.log( this.context);
    //  const img = this.refs.image
  }
  // componentDidUpdate() {
  //   this.updateCanvas( this.props.block);
  // }

  updateCanvas() {
    console.log(this.canvas.getContext("2d"));
    const context = this.canvas.getContext("2d");
    context.fillStyle = "#fff5f5";
    context.rect(10, 10, 50, 50);
    context.fill();
    //   this.context.font = 10 + 'px Arial Black';
    //   this.context.textAlign = "center";
    //   this.context.textBaseline = 'middle';
    //   this.context.fillStyle = "#fff5f5";
    //   this.context.shadowBlur = 10;
    //   this.context.shadowColor = "black";
    //  this.context.fillText(block.val, block.width / 2, block.height / 2);
  }

  render() {
    const { block, leftClickHandler, rightClickHandler } = this.props;

    //const blockState = block.status === "opened" ? block.val : null;

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
