import "./field.style.css";
import FieldBlock from '../field-block'

const Field = ( { field }) => {

    const blocks = [];
    let blocks_y = [];

    for (let y = 0; y < field.length; y++) {

       
        for (let x = 0; x < field.length; x++) {
           
            blocks_y.push(<FieldBlock key = {`${y}-${x}`} />);

            
        }
        blocks.push(blocks_y);
        blocks_y = [];

    }
 

  return (
      <div className = "field">
{ blocks }
      </div>  
  
  );
}

export default Field;
// field.length <FieldBlock key = {`${field[0][0]}`} />