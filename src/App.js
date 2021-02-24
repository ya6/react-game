import "./App.css";
import { Component } from "react";
import Field from "./components/field";
import _random from "./helpers/_random";

class App extends Component {
  constructor() {
    super();
    this.state = {
      fieldSize: 10,
      field: [],
    };
  }

  componentDidMount() {
    //set arr
    const { fieldSize } = this.state;

    const _arr = [];
    for (var y = 0; y < fieldSize; y++) {
      _arr[y] = [];
      for (var x = 0; x < fieldSize; x++) {
        _arr[y][x] = { val: 0, status: "hidden" };
      }
    }

    console.log(_arr);

    
    //set bombs
      for (let b = 0; b < fieldSize; b++) {
        _arr[_random(0, this.state.fieldSize - 1)]
        [_random(0, this.state.fieldSize - 1)].val = -1;
      }

      console.log(_arr);
 

    //set other blocks

   

    for (let y = 0; y < fieldSize; y++) {
      for (let x = 0; x < fieldSize; x++) {
        if (_arr[y][x].val !== -1) {

          if (y - 1 >= 0 && x - 1 >= 0) {
            _arr[y][x].val += +(_arr[y - 1][x - 1].val === -1)
          }

          if (y - 1 >= 0) {
            console.log('if');
            _arr[y][x].val += +(_arr[y - 1][x].val === -1);
          }


          

         

          if (y - 1 >= 0 && x + 1 < fieldSize) {
           _arr[y][x].val += +(_arr[y - 1][x + 1].val === -1);
          }

          if (x + 1 < fieldSize) {
           _arr[y][x].val += +(_arr[y][x + 1].val === -1);
          }

          if (y + 1 < fieldSize && x + 1 < fieldSize) {
           _arr[y][x].val += +(_arr[y + 1][x + 1].val === -1);
          }

          if (y + 1 <fieldSize) {
           _arr[y][x].val += +(_arr[y + 1][x].val === -1);
          }

          if (y + 1 <fieldSize && x-1 >= 0) {
           _arr[y][x].val += +(_arr[y + 1][x-1].val === -1);
          }

          if (x-1 >= 0) {
           _arr[y][x].val += +(_arr[y][x-1].val === -1);
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

  render() {
    return (
      <div className="App">
        <Field field={this.state.field} />
      </div>
    );
  }
}

export default App;
