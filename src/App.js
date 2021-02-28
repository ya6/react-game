import "./App.css";
import React, { Component } from "react";
import Field from "./components/field";
import _random from "./helpers/_random";
import back_url from "./assets/img/dig_bel_2+.png";

class App extends Component {
  state = {
    fieldWidth: 10,
    fieldHeight: 8,
    size: 50,
    spots: 10,
    field: [],
    currentBlock: {},
    imageRatio: 1,
    imageWidth: 1000,
    playGame: false,
    gameOver: false,
  };

  removed_canvasRef = React.createRef();

  componentDidMount() {
    console.log("App componentDidMount");

    const { fieldWidth, fieldHeight, spots, size, imageWidth } = this.state;

    const _imageRatio = imageWidth / (fieldWidth * size);
    //get arr
    const _arr = [];

    const canvas = this.removed_canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = fieldWidth * size;
    canvas.height = fieldHeight * size;

    const image = new Image();
    image.src = back_url;
    image.addEventListener("load", () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
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
      while (b < spots) {
        if (
          _arr[_random(0, this.state.fieldHeight - 1)][
            _random(0, this.state.fieldWidth - 1)
          ].val !== -2 ||
          _arr[_random(0, this.state.fieldHeight - 1)][
            _random(0, this.state.fieldWidth - 1)
          ].val !== -1
        ) {
          b += 1;
          //  console.log(b);
          _arr[_random(0, this.state.fieldHeight - 1)][
            _random(0, this.state.fieldWidth - 1)
          ].val = -1;
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

    this.setState({ field: _arr, imageRatio: _imageRatio }, () => {
      console.log("field", this.state.field);
    });
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

  componentDidUpdate() {
    console.log("App componentDidUpdate");
  }

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

  // playGame = () => {
  //   this.setState({playGame: true}, () => {console.log(this.playGame)});
  //   console.log('clicked');
  // }

  playGame = () => {
    console.log('playGame');
    this.setState({playGame: true});
  }

  render() {
    const {
      field,
      imageRatio,
      fieldWidth,
      fieldHeight,
      imageWidth,
      size,
      playGame
    } = this.state;

    const _style = {
      width: fieldWidth * size,
      height: fieldHeight * size,
    };

    return (

      <div className="App">
        {/* header */}

        { playGame === false ?  <div>
          <h2  className="white-color">Territory scanned!</h2>
          <canvas
            style={_style}
            ref={this.removed_canvasRef}
           
          ></canvas>
          <button type="button" onClick={this.playGame}> Play game </button>
        </div> : null }


 { playGame === true ?    <Field
          field={field}
          imageRatio={imageRatio}
          leftClickHandler={this.leftClickHandler}
          rightClickHandler={this.rightClickHandler}
        /> : null }
       

      

     
      </div>
    );
  }
}

export default App;
