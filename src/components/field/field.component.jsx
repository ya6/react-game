import "./field.style.css";
import FieldBlock from '../field-block'


const Field = ( { field, fieldWidth, fieldHeight, size, rightClickHandler, leftClickHandler, imageRatio,  back, med_box }) => {

    const blocks = [];
 
    for (let y = 0; y < field.length; y++) {

       
        for (let x = 0; x < field[0].length; x++) {

            if (field[y][x].val !==-2) {
                blocks.push(<FieldBlock key = {`${y}-${x}`}
                block = { field[y][x] }
                imageRatio = { imageRatio }
                back = { back}
                med_box = { med_box }
                rightClickHandler = { rightClickHandler }
                leftClickHandler = { leftClickHandler } />);  
                
            }
           
                   
        }
    
    }
   
    const _style = {
        width: fieldWidth * size + 10,
        height: fieldHeight * size + 10,
      };


  return (
      <div className = "field"  style = { _style }>
{ blocks.map((block, index) => {return (<div key = {index} > { block} </div>)}) }
      </div>  
  
  );
}

export default Field;
