import "./field-block.style.css";

const FieldBlock = ({ block, changeStatus }) => {
 // console.log(block);
 const blockState = block.status === 'opened' ? block.val : null;


  return (
      <div className = "field-block" onClick = {() => changeStatus(block)}>
       {blockState}
      </div>  
  )
};

export default FieldBlock;
