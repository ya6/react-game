import "./field.style.css";
import FieldBlock from '../field-block'

const Field = ( { field, changeStatus }) => {

    const blocks = [];
    let blocks_y = [];

    for (let y = 0; y < field.length; y++) {

       
        for (let x = 0; x < field.length; x++) {
           
            blocks_y.push(<FieldBlock key = {`${y}-${x}`}  block = {field[y][x]} changeStatus = {changeStatus }  />);

            
        }
        blocks.push(blocks_y);
        blocks_y = [];

    }
 
    const _style = { display: 'flex' };
  

  return (
      <div className = "field">
{ blocks.map(blocks_y => {return (<div style={_style}> { blocks_y} </div>)}) }
      </div>  
  
  );
}

export default Field;
// field.length <FieldBlock key = {`${field[0][0]}`} />


//(<FieldBlock style={_style}> block ={ blocks_y} </FieldBlock>