import "./App.css";
import { Component } from "react";
import Field from "./components/field";
import _random from "./helpers/_random";
import back_url from './assets/img/dig_bel_2.png';

class App extends Component {
  constructor() {
    super();
    this.state = {
      fieldWidth: 10,
      fieldHeight: 8,
      size: 40,
      spots: 10,
      field: [],
      currentBlock: {},
    };
  }
 
  componentDidMount() {

  console.log(back_url);

    //set arr
    const { fieldWidth, fieldHeight, spots, size } = this.state;
    const _arr = [];
    for (var y = 0; y < fieldHeight; y++) {
      _arr[y] = [];
      for (var x = 0; x < fieldWidth; x++) {
        _arr[y][x] = { val: 0, status: "hidden", y: y, x: x, 
        size: size, 
      left:x * size, top:y * size};
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

          //_arr[y-1][x-1]
          // _arr[y-1][x]
          // _arr[y-1][x+1]
          // _arr[y][x+1]
          // _arr[y+1][x+1]
          // _arr[y+1][x]
          // _arr[y+1][x-1]
          // _arr[y][x-1]
        }
      }
    }

    this.setState({ field: _arr });
  }

  leftClickHandler = (block) => {
    const _arr = this.state.field;

    switch (block.val) {
      case -1:
        console.log("boom");
        break;
      case 0:
        this.handleEmptyArea(block, _arr);
        break;

      default:
        _arr[block.y][block.x].status = "opened";
        break;
    }

    this.setState({ field: _arr });
  };

  handleEmptyArea = (block, _arr) => {
    _arr[block.y][block.x].status = "opened";
   
    if (block.y - 1 >= 0) {
      if (_arr[block.y - 1][block.x].val === 0 &&  _arr[block.y - 1][block.x].status === 'hidden') {
        this.handleEmptyArea(_arr[block.y - 1][block.x], _arr);
      }
    }

    if (block.y + 1 < _arr.length) {
      if (_arr[block.y + 1][block.x].val === 0 && _arr[block.y + 1][block.x].status === 'hidden') {
        this.handleEmptyArea(_arr[block.y + 1][block.x], _arr);
      }
    }
   
    if (block.x - 1 >= 0) {
      if (_arr[block.y][block.x - 1].val === 0 &&  _arr[block.y][block.x - 1].status === 'hidden') {
        this.handleEmptyArea(_arr[block.y][block.x -1], _arr);
      }
    }


    if (block.x + 1 < _arr[0].length) {
      if (_arr[block.y][block.x + 1].val === 0 && _arr[block.y][block.x + 1].status === 'hidden') {
        this.handleEmptyArea(_arr[block.y][block.x + 1], _arr);
      }
    }

    return _arr;
  };

  rightClickHandler = (e, block) => {
    e.preventDefault();
    console.log("rightClickHandler", block);
  };

  render() {
    return (
      <div className="App">
        <Field
          field={this.state.field}
          leftClickHandler={this.leftClickHandler}
          rightClickHandler={this.rightClickHandler}
        />
      </div>
    );
  }
}

export default App;
