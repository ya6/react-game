import "./field.style.css";
import FieldBlock from '../field-block'

const Field = ( { field, rightClickHandler, leftClickHandler }) => {

    const blocks = [];
    let blocks_y = [];

    for (let y = 0; y < field.length; y++) {

       
        for (let x = 0; x < field[0].length; x++) {
           
            blocks_y.push(<FieldBlock key = {`${y}-${x}`}  block = {field[y][x]} 
            rightClickHandler = {rightClickHandler}
            leftClickHandler = {leftClickHandler } />);

            
        }
        blocks.push(blocks_y);
        blocks_y = [];

    }
 
    const _style = { display: 'flex' };
  

  return (
      <div className = "field">
{ blocks.map((blocks_y, index) => {return (<div key = {index} style={_style}> { blocks_y} </div>)}) }
      </div>  
  
  );
}

export default Field;
