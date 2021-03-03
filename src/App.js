import "./App.css";
import React, { Component } from "react";
import Header from "./components/header";
import Field from "./components/field";
import _random from "./helpers/_random";
import back_url from "./assets/img/dig_bel_2+.png";
// import back_url from "./assets/img/vini.png";

import ButtonPlay from "./components/button-play";
import Footer from "./components/footer";
import music_url from "./assets/sound/music_1.mp3";

class App extends Component {
  state = {
    fieldWidth: 15,
    fieldHeight: 12,
    field_size_factor: 3,
    size: 50,
    spots: 0,
    med_boxes: 0,
    field: [],
    currentBlock: {},
    imageRatio: 1,
    imageWidth: 1000,
    screenWidth: 0,
    screenHeight: 0,
    screenRatio: 1,
    scanReady: false,

    playGame: false,
    gameOver: false,

    musicON: false,
  };

  removed_canvasRef = React.createRef();

  fieldSizeHandler = (e) => {
    const _field_size_factor = e.target.value;

    const _fieldWidth = _field_size_factor * 5;
    const _fieldHeight = _field_size_factor * 4;

    this.setState({
      fieldWidth: _fieldWidth,
      fieldHeight: _fieldHeight,
      field_size_factor: _field_size_factor,
      playGame: false,
    });
  };

  componentDidMount() {
    const _screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const _screenHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    this.setNewField();

    this.setState({
      screenWidth: _screenWidth,
      screenHeight: _screenHeight,
    });
  }

  musicSingleton = new Audio(music_url);
  

  musicControlHandler = () => {
    console.log("musicControlHandler");
    this.musicSingleton.loop = true;
    let _musicON = this.state.musicON;

    _musicON = !_musicON;

    if (_musicON) {
      this.musicSingleton.play();
    } else {
      this.musicSingleton.pause();
    }

    this.setState({ musicON: _musicON }, () => console.log(this.state.musicON));
  };

  setNewField = () => {
    //get arr
    const { fieldWidth, fieldHeight, size, imageWidth } = this.state;

    const _screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const _screenHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    const _spots = Math.floor(fieldWidth * fieldHeight * 0.1);
    const _imageRatio = imageWidth / (fieldWidth * size);
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
          setTimeout(() => {
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

            setTimeout(() => {
              this.setState({ scanReady: true });
            }, 800);
          }, 800);

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
          //  context.font = 20 + "px Arial";
          //  context.textAlign = "center";
          //  context.textBaseline = "middle";
          //  context.fillStyle = "gray";

          //  context.fillText(
          //    String(_arr[y][x].val),
          //    x * size + 20,
          //    y * size + 20
          //  );
        }
      }

      // set bombs
      let b = 0;
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

    //set main map blok size ratio

    const _safe_width = _screenWidth - _screenWidth * 0.1;
    const _safe_height = _screenHeight - _screenHeight * 0.1 - 180;

    const _x_screenRatio = (_safe_width / (fieldWidth * size)).toFixed(1);

    const _y_screenRatio = (_safe_height / (fieldHeight * size)).toFixed(1);

    const _screenRatio =
      _x_screenRatio <= _y_screenRatio ? _x_screenRatio : _y_screenRatio;

    this.setState({
      field: _arr,
      spots: _spots,
      imageRatio: _imageRatio,
      screenRatio: _screenRatio,
      gameOver: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.field_size_factor !== this.state.field_size_factor) {
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
        _arr[block.y][block.x].med = false;
        break;
    }

    let _med_boxes = 0;

    for (let y = 0; y < _arr.length; y++) {
      for (let x = 0; x < _arr.length; x++) {
        if (_arr[y][x].med) {
          _med_boxes += 1;
        }
      }
    }

    this.setState({ field: _arr, gameOver: _gameOver, med_boxes: _med_boxes });
  };

  rightClickHandler = (e, block) => {
    const _gameOver = this.state.gameOver;

    if (_gameOver) {
      return;
    }

    e.preventDefault();

    const _arr = this.state.field;

 
if (_arr[block.y][block.x].status === 'hidden') {  
  _arr[block.y][block.x].med = (_arr[block.y][block.x].med)
  ? (_arr[block.y][block.x].med = false)
  : (_arr[block.y][block.x].med = true);
}

    let _med_boxes = 0;

    for (let y = 0; y < _arr.length; y++) {
      for (let x = 0; x < _arr.length; x++) {
        if (_arr[y][x].med) {
          _med_boxes += 1;
        }
      }
    }

    this.setState({ field: _arr, med_boxes: _med_boxes });
  };

  handleEmptyArea = (block, _arr) => {
    _arr[block.y][block.x].status = "opened";
    _arr[block.y][block.x].med = false;

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

  playNewGame = () => {
    this.setState({ playGame: true });
  };

  setNewGame = () => {
    window.location.reload();
  };

  render() {
    const {
      field,
      imageRatio,
      fieldWidth,
      fieldHeight,
      size,
      spots,
      med_boxes,
      playGame,
      screenWidth,
      screenHeight,
      field_size_factor,
      screenRatio,
      scanReady,
    } = this.state;

    let _style;

    if (screenHeight > screenWidth) {
      _style = {
        width: screenWidth * 0.8,
        height: (screenWidth * 0.8) / 1.25,
      };
    } else {
      _style = {
        width: screenHeight * 0.55 * 1.25,
        height: screenHeight * 0.55,
      };
    }

    return (
      <div className="App">
        <Header
          med_boxes={med_boxes}
          fieldWidth={fieldWidth}
          size={size}
          spots={spots}
          screenRatio={screenRatio}
          field_size_factor={field_size_factor}
          fieldSizeHandler={this.fieldSizeHandler}
          setNewGame={this.setNewGame}
          musicControlHandler={this.musicControlHandler}
        />

        {playGame === false ? (
          <div className="canvas-block">
            <canvas style={_style} ref={this.removed_canvasRef}></canvas>
            <div className="button-container">
              {scanReady ? <ButtonPlay playNewGame={this.playNewGame} /> : null}
            </div>
          </div>
        ) : null}

        {playGame === true ? (
          <Field
            field={field}
            size={size}
            fieldWidth={fieldWidth}
            fieldHeight={fieldHeight}
            imageRatio={imageRatio}
            screenRatio={screenRatio}
            leftClickHandler={this.leftClickHandler}
            rightClickHandler={this.rightClickHandler}
          />
        ) : null}
        <Footer size={size} fieldWidth={fieldWidth} screenRatio={screenRatio} />
      </div>
    );
  }
}

export default App;
