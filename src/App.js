import "./App.css";
import { Component } from "react";
import Field from "./components/field";
import _random from "./helpers/_random";

class App extends Component {
  constructor() {
    super();
    this.state = {
      fieldWidth: 10,
      fieldHeight: 8,
      size: 50,
      spots: 10,
      field: [],
      currentBlock: {},
      imageRatio: 1,
      imageWidth: 1000,
      back: new Image(),
      med_box: new Image(),
      gameOver: false
    };
  }

  componentDidMount() {

    console.log('App componentDidMount' );
    //set arr
    const { fieldWidth, fieldHeight, spots, size, imageWidth } = this.state;

    const _imageRatio = imageWidth / (fieldWidth * size);
    const _arr = [];

    for (var y = 0; y < fieldHeight; y++) {
      _arr[y] = [];
      for (var x = 0; x < fieldWidth; x++) {
        _arr[y][x] = {
          val: 0,
          status: "hidden",
          y: y,
          x: x,
          size: size,
          left: x * size,
          top: y * size,
          med: false,
          updated: 0
        };
      }
    }

    //set bombs
    for (let b = 0; b < spots; b++) {
      _arr[_random(0, this.state.fieldHeight - 1)][
        _random(0, this.state.fieldWidth - 1)
      ].val = -1;
    }

    //set other blocks
    for (let y = 0; y < fieldHeight; y++) {
      for (let x = 0; x < fieldWidth; x++) {
        if (_arr[y][x].val !== -1) {
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


    this.setState({ field: _arr, imageRatio: _imageRatio });
  }

  leftClickHandler = (block) => {

    let  _gameOver  = this.state.gameOver;
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
    console.log('App componentDidUpdate');
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

  render() {
const { field, imageRatio } =  this.state;

    return (
      <div className="App">
        <Field
          field = { field }
          imageRatio = { imageRatio }
          leftClickHandler = { this.leftClickHandler }
          rightClickHandler = { this.rightClickHandler }
        />
      </div>
    );
  }
}

export default App;
