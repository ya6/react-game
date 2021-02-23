import "./App.css";
import { Component } from "react";
import Field from "./components/field";
import _random from './helpers/_random'


class App extends Component {
  constructor() {
    super();
    this.state = {
      fieldSize: 10
      ,
      field: [],
    };
  }

  componentDidMount() {
    //set arr
    const { fieldSize } = this.state;
    var _arr = new Array(fieldSize);

    for (let y = 0; y < fieldSize; y++) {
      _arr[y] = new Array(fieldSize);
    }

    for (let b = 0; b < fieldSize; b++) {
      _arr[_random(0, this.state.fieldSize-1)][_random(0, this.state.fieldSize-1)] = -1
    }

   // console.log(_arr);
    this.setState( { field: _arr});
  }

  render() {
    return (
      <div className="App">

        <Field  field = {this.state.field}/>
      </div>
    );
  }
}

export default App;
