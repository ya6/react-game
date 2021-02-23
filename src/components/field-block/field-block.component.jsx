import "./field-block.style.css";

const FieldBlock = ({ block }) => {
  console.log('block', block);
  return (
      <div className = "field-block">
          {block}
      </div>  
  )
};

export default FieldBlock;
