import "./App.css";
import React, { Component } from "react";
import Header from "./components/header";
import Field from "./components/field";
import _random from "./helpers/_random";
import back_url from "./assets/img/dig_bel_2+.png";

class App extends Component {
  state = {
    fieldWidth: 15,
    fieldHeight: 12,
    field_size_factor: 3,
    size: 50,
    spots: 0,
    field: [],
    currentBlock: {},
    imageRatio: 1,
    imageWidth: 1000,
    screenWidth: 0,
    screenHeight: 0,

    playGame: false,
    gameOver: false,
  };

  removed_canvasRef = React.createRef();


  fieldSizeHandler = (e) => {
    console.log('fieldSizeHandler ', e.target.value);

    const _field_size_factor =   e.target.value;

    const _fieldWidth = _field_size_factor * 5;
    const _fieldHeight = _field_size_factor * 4;

    this.setState( { fieldWidth: _fieldWidth,
      fieldHeight: _fieldHeight,
      field_size_factor: _field_size_factor } );
  }

  componentDidMount() {
    console.log("App componentDidMount");

    const { fieldWidth, fieldHeight, size, imageWidth } = this.state;

    const _screenWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    const _screenHeight =  window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

   

    const _imageRatio = imageWidth / (fieldWidth * size);
   // const _spots = Math.floor(fieldWidth * fieldHeight * 0.1);
   

    this.setNewField();

    //set base state
    //
    //

    this.setState(
      {
       
        imageRatio: _imageRatio,
     
        screenWidth: _screenWidth,
        screenHeight: _screenHeight
      }
    );
  }

  setNewField = () => {
     //get arr

     const {fieldWidth, fieldHeight, size} = this.state;
     const _spots = Math.floor(fieldWidth * fieldHeight * 0.1);
     const _arr = [];

     const canvas = this.removed_canvasRef.current;
     const context = canvas.getContext("2d");
     canvas.width = fieldWidth * size;
     canvas.height = fieldHeight * size;
 
     const image = new Image();
     image.src = back_url;
     image.addEventListener("load", () => {
 
 
       context.drawImage(image, 0, 0, canvas.width, canvas.height);
 
       // step inside
       const compensation = 3;
 
       for (let y = 0; y < fieldHeight; y++) {
         _arr[y] = [];
 
         for (let x = 0; x < fieldWidth; x++) {
           if (
             context.getImageData(
               x * size + compensation,
               y * size + compensation,
               1,
               1
             ).data[0] > 0 ||
             context.getImageData(
               x * size + compensation,
               y * size + size + compensation,
               1,
               1
             ).data[0] > 0 ||
             context.getImageData(
               x * size + size - compensation,
               y * size + compensation,
               1,
               1
             ).data[0] > 0 ||
             context.getImageData(
               x * size + size - compensation,
               y * size + size - compensation,
               1,
               1
             ).data[0] > 0 ||
             context.getImageData(
               x * size + compensation,
               y * size + size / 2 - compensation,
               1,
               1
             ).data[0] > 0 ||
             context.getImageData(
               x * size + compensation,
               y * size + size / 2 - compensation,
               1,
               1
             ).data[0] > 0
           ) {
             _arr[y][x] = {
               val: 0,
               status: "hidden",
               y: y,
               x: x,
               size: size,
               left: x * size,
               top: y * size,
               med: false,
               updated: 0,
             };
           } else {
             _arr[y][x] = {
               val: -2,
               status: "hidden",
               y: y,
               x: x,
               size: size,
               left: x * size,
               top: y * size,
               med: false,
               updated: 0,
             };
           }
 
           //set num
           context.font = 20 + "px Arial";
           context.textAlign = "center";
           context.textBaseline = "middle";
           context.fillStyle = "gray";
 
           context.fillText(
             String(_arr[y][x].val),
             x * size + 20,
             y * size + 20
           );
 
           context.strokeStyle = "red";
           context.strokeRect(
             x * size + compensation,
             y * size + compensation,
             1,
             1
           );
           context.strokeStyle = "green";
           context.strokeRect(
             x * size + compensation,
             y * size + size - compensation,
             1,
             1
           );
           context.strokeStyle = "blue";
           context.strokeRect(
             x * size + size - compensation,
             y * size + compensation,
             1,
             1
           );
           context.strokeStyle = "orange";
           context.strokeRect(
             x * size + size - compensation,
             y * size + size - compensation,
             1,
             1
           );
         }
       }
 
       // set bombs
       let b = 0;
       console.log("spots", this.state.spots);
       while (b < _spots) {
         const _y = _random(0, fieldHeight - 1);
         const _x = _random(0, fieldWidth - 1);
 
         if (_arr[_y][_x].val !== -2 && _arr[_y][_x].val !== -1) {
           b += 1;
           _arr[_y][_x].val = -1;
         }
       }
 
       // set other blocks
       for (let y = 0; y < fieldHeight; y++) {
         for (let x = 0; x < fieldWidth; x++) {
           if (_arr[y][x].val !== -1 && _arr[y][x].val !== -2) {
             if (y - 1 >= 0 && x - 1 >= 0) {
               _arr[y][x].val += +(_arr[y - 1][x - 1].val === -1);
             }
 
             if (y - 1 >= 0) {
               _arr[y][x].val += +(_arr[y - 1][x].val === -1);
             }
 
             if (y - 1 >= 0 && x + 1 < fieldHeight) {
               _arr[y][x].val += +(_arr[y - 1][x + 1].val === -1);
             }
 
             if (x + 1 < fieldWidth) {
               _arr[y][x].val += +(_arr[y][x + 1].val === -1);
             }
 
             if (y + 1 < fieldHeight && x + 1 < fieldWidth) {
               _arr[y][x].val += +(_arr[y + 1][x + 1].val === -1);
             }
 
             if (y + 1 < fieldHeight) {
               _arr[y][x].val += +(_arr[y + 1][x].val === -1);
             }
 
             if (y + 1 < fieldHeight && x - 1 >= 0) {
               _arr[y][x].val += +(_arr[y + 1][x - 1].val === -1);
             }
 
             if (x - 1 >= 0) {
               _arr[y][x].val += +(_arr[y][x - 1].val === -1);
             }
           }
         }
       }
     });

this.setState({field: _arr, spots: _spots,});

  }

  componentDidUpdate( prevProps,  prevState) {
    console.log("App componentDidUpdate", prevState.field_size_factor, this.state.field_size_factor, this.state.fieldWidth);
    if ( prevState.field_size_factor !==  this.state.field_size_factor) {

      this.setNewField();

      
    }
  }

  leftClickHandler = (block) => {
    let _gameOver = this.state.gameOver;
    const _arr = this.state.field;

    if (_gameOver) {
      return;
    }

    switch (block.val) {
      case -1:
        console.log("boom");

        _gameOver = true;

        for (let y = 0; y < _arr.length; y++) {
          for (let x = 0; x < _arr[0].length; x++) {
            if (_arr[y][x].val === -1) {
              _arr[y][x].status = "blow";
            }
          }
        }

        break;
      case 0:
        this.handleEmptyArea(block, _arr);
        break;

      default:
        _arr[block.y][block.x].status = "opened";
        break;
    }

    this.setState({ field: _arr, gameOver: _gameOver });
  };



  rightClickHandler = (e, block) => {
    e.preventDefault();
    console.log("rightClickHandler", block);

    const _arr = this.state.field;
    _arr[block.y][block.x].med = _arr[block.y][block.x].med
      ? (_arr[block.y][block.x].med = false)
      : (_arr[block.y][block.x].med = true);

    this.setState({ field: _arr });
  };

  handleEmptyArea = (block, _arr) => {
    _arr[block.y][block.x].status = "opened";
    _arr[block.y][block.x].updated += 1;

    if (block.y - 1 >= 0) {
      if (
        _arr[block.y - 1][block.x].val === 0 &&
        _arr[block.y - 1][block.x].status === "hidden"
      ) {
        this.handleEmptyArea(_arr[block.y - 1][block.x], _arr);
      }
    }

    if (block.y + 1 < _arr.length) {
      if (
        _arr[block.y + 1][block.x].val === 0 &&
        _arr[block.y + 1][block.x].status === "hidden"
      ) {
        this.handleEmptyArea(_arr[block.y + 1][block.x], _arr);
      }
    }

    if (block.x - 1 >= 0) {
      if (
        _arr[block.y][block.x - 1].val === 0 &&
        _arr[block.y][block.x - 1].status === "hidden"
      ) {
        this.handleEmptyArea(_arr[block.y][block.x - 1], _arr);
      }
    }

    if (block.x + 1 < _arr[0].length) {
      if (
        _arr[block.y][block.x + 1].val === 0 &&
        _arr[block.y][block.x + 1].status === "hidden"
      ) {
        this.handleEmptyArea(_arr[block.y][block.x + 1], _arr);
      }
    }

    return _arr;
  };

  playGame = () => {
    console.log("playGame");
    this.setState({ playGame: true });
  };

  render() {
    const {
      field,
      imageRatio,
      fieldWidth,
      fieldHeight,
      size,
      playGame,
      screenWidth,
      screenHeight,
      field_size_factor
    } = this.state;

    let _style = null;

   if (screenHeight > screenWidth) {   
     _style = {
      width:(screenWidth * 0.8),
      height: (screenWidth * 0.8)/1.25,
    };
  } else {  _style = {
    width:(screenHeight * 0.7)*1.25,
    height: (screenHeight * 0.7),
  };}

   

    return (
      <div className="App">
        <Header 
        field_size_factor =  { field_size_factor }
        fieldSizeHandler = { this.fieldSizeHandler }
        />

        {playGame === false ? (
          <div className="canvas-block">
            <h2 className="text-white">Territory scanned!</h2>
            <canvas style={_style} ref={this.removed_canvasRef}></canvas>
            <button type="button" onClick={this.playGame}>
              {" "}
              Play game{" "}
            </button>
          </div>
        ) : null}

        {playGame === true ? (
          <Field
            field={field}
            size={size}
            fieldWidth={fieldWidth}
            fieldHeight={fieldHeight}
            imageRatio={imageRatio}
            leftClickHandler={this.leftClickHandler}
            rightClickHandler={this.rightClickHandler}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
