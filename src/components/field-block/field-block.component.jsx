import "./field-block.style.css";

const FieldBlock = ({ block, leftClickHandler, rightClickHandler }) => {
  const blockState = block.status === "opened" ? block.val : null;

  return (
    <div
      className="field-block"
      onClick={() => leftClickHandler(block)}
      onContextMenu={(e) => rightClickHandler(e, block)}
    >
      {blockState}
    </div>
  );
};

export default FieldBlock;
