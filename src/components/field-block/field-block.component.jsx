import "./field-block.style.css";

const FieldBlock = ({ block }) => {
 // console.log(block);
  return (
      <div className = "field-block">
          {block.val}
      </div>  
  )
};

export default FieldBlock;
