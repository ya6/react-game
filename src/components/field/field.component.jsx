import "./field.style.css";
import FieldBlock from '../field-block'


const Field = ( { field, rightClickHandler, leftClickHandler, imageRatio,  back, med_box }) => {

    const blocks = [];
 
    for (let y = 0; y < field.length; y++) {

       
        for (let x = 0; x < field[0].length; x++) {
           
            blocks.push(<FieldBlock key = {`${y}-${x}`}
            block = { field[y][x] }
            imageRatio = { imageRatio }
            back = { back}
            med_box = { med_box }
            rightClickHandler = { rightClickHandler }
            leftClickHandler = { leftClickHandler } />);          
        }
    
    }
 

  return (
      <div className = "field">
{ blocks.map((block, index) => {return (<div key = {index} > { block} </div>)}) }
      </div>  
  
  );
}

export default Field;
