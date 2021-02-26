import "./field-block.style.css";

const FieldBlock = ({ block, leftClickHandler, rightClickHandler }) => {
  const blockState = block.status === "opened" ? block.val : null;
console.log(block);
  const _style = {
    width: block.size,
    height:  block.size,
    left: block.left,
    top: block.top
  }

  return (
    <div style={_style}
      className="field-block"
      onClick={() => leftClickHandler(block)}
      onContextMenu={(e) => rightClickHandler(e, block)}
    >
      {blockState}
    </div>
  );
};

export default FieldBlock;
