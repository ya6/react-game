import { render } from '@testing-library/react';
import React, { Component } from 'react';
import back_url from '../../assets/img/dig_bel_2+.png';
import './removed.style.css';

class Removed extends Component{

    removed_canvasRef = React.createRef();

    componentDidMount() {

        const {field,
            imageRatio,
            fieldWidth,
            fieldHeight,
            imageWidth, size}  = this.props;
    
    
        const image = new Image();
        image.src =back_url;
    
        image.addEventListener("load", () => {});
    

    }

   
  
  render() {

    const {fieldWidth, fieldHeight, size } = this.props;

    const   _style = {
        width: fieldWidth * size,
        height: fieldHeight * size,
        
      };
    

    
    return ( 
        <canvas
          style={_style}
          ref={ this.removed_canvasRef }
        
          className="removed"
        
        ></canvas>
      );


  }



}

export default Removed