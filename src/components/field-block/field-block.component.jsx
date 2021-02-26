import { render } from "@testing-library/react";
import { Component } from "react";
import "./field-block.style.css";




class FieldBlock extends Component {
  
  render() {

    const {block, leftClickHandler, rightClickHandler } = this.props;



    const blockState = block.status === "opened" ? block.val : null;

    const _style = {
      width: block.size,
      height:  block.size,
      left: block.left,
      top: block.top
    }
  
    return (
      <canvas  ref={(c) => this.context = c.getContext('2d')} style={_style} id = {`${block.y}-${block.x}`}
        className="field-block"
        onClick={() => leftClickHandler(block)}
        onContextMenu={(e) => rightClickHandler(e, block)}
      >
        {blockState}
      </canvas>
    );

  }

  
}

export default FieldBlock;
