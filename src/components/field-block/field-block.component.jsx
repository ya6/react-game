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
  
    const { block, imageRatio } = this.props;

    const image = new Image();
    image.src = back_url;

    image.addEventListener("load", () => {
      this.canvas = this["canvasRef"].current;
      this.context = this.canvas.getContext("2d");
      this.canvas.width = "100";
      this.canvas.height = "100";

      this.context.drawImage(
        image,
        block.left * imageRatio,
        block.top * imageRatio,
        block.size * imageRatio,
        block.size * imageRatio,
        5,
        5,
        this.canvas.width - 5,
        this.canvas.width - 5
      );
    });
  }

  showSpot = (block, imageRatio) => {
    const context = this.canvas.getContext("2d");
    context.font = (block.size * imageRatio) / 2 + "px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "black";

    context.shadowColor = "#bfbfbf";
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;
    context.shadowBlur = 3;

    context.fillText(String(block.val), 50, 50);


  }

  updateCanvas = (block, imageRatio) => { 
    const context = this.canvas.getContext("2d");
   
    if (block.val > 0 ) {
      context.font = (block.size * imageRatio) / 2 + "px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "black";

    context.shadowColor = "#bfbfbf";
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;
    context.shadowBlur = 3;

    context.fillText(String(block.val), 50, 50);
    }

    if (block.val === 0 ) {

      context.fillStyle = '#bdfcfc';

      context.fillRect(5, 5, 100 - 5, 100 - 5);
      
    }

    // if (block.val === -1) {

    //   for (let block = 0; block < blocks.length; block++) {
        
    //     context.font = (block.size * imageRatio) / 2 + "px Arial";
    //     context.textAlign = "center";
    //     context.textBaseline = "middle";
    //     context.fillStyle = "black";
    
    //     context.shadowColor = "#bfbfbf";
    //     context.shadowOffsetX = 3;
    //     context.shadowOffsetY = 3;
    //     context.shadowBlur = 3;
    
    //     context.fillText(String(block.val), 50, 50);
        
    //   }
      
    // }
    
  };

  render() {
    const {
      block,
      leftClickHandler,
      rightClickHandler,
      imageRatio,
      
    } = this.props;

    if (block.status === "opened") {
      this.updateCanvas(block, imageRatio);
    }

    if (block.status === "blow") {
      this.showSpot(block, imageRatio);
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
