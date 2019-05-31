import React, { Component } from "react";
import Buttons from "../elements/Buttons";
import MatrixComponent from "../elements/Matrix";

class MainContent extends Component {
  state = {
    matrixA: {
      rowA: 3,
      colA: 3,
      valuesA: new Array(3 * 3).fill(0)
    },
    matrixB: {
      rowB: 3,
      colB: 3,
      valuesB: new Array(3 * 3).fill(0)
    }
  };
  exchangeMatrice = () => {
    const { colA, rowA, valuesA } = this.state.matrixA;
    const { colB, rowB, valuesB } = this.state.matrixB;

    const tempColA = colA;
    const tempRowA = rowA;
    const tempValuesA = valuesA;

    this.setState({
      matrixA: {
        colA: colB,
        rowA: rowB,
        valuesA: valuesB
      },
      matrixB: {
        colB: tempColA,
        rowB: tempRowA,
        valuesB: tempValuesA
      }
    });
  };
  onChangeHandle = e => {
    const { matrixA } = this.state;
    const { valuesA } = matrixA;
    const { matrixB } = this.state;
    const { valuesB } = matrixB;
    const ref = e.target.className;

    if (ref === "A") {
      const newValuesA = valuesA.slice();
      newValuesA[[e.target.name]] = e.target.value;
      this.setState({
        matrixA: {
          ...matrixA,
          valuesA: newValuesA
        }
      });
    } else if (ref === "B") {
      const newValuesB = valuesB.slice();
      newValuesB[[e.target.name]] = e.target.value;
      this.setState({
        matrixB: { ...matrixB, valuesB: newValuesB }
      });
    }
  };

  onClickHandle = e => {
    const { matrixA, matrixB } = this.state;
    const { rowA, colA, valuesA } = matrixA;
    const { rowB, colB, valuesB } = matrixB;
    const name = e.target.name;
    if (name.indexOf("A") > -1) {
      if ((rowA <= 1 && name === "rowA-") || (colA <= 1 && name === "colA-")) {
        return null;
      }
      const newRowA =
        name === "rowA+" ? rowA + 1 : name === "rowA-" ? rowA - 1 : rowA;
      const newColA =
        name === "colA+" ? colA + 1 : name === "colA-" ? colA - 1 : colA;

      const copyvaluesA = valuesA.slice();
      let multiD_valuesA = [];
      while (copyvaluesA.length)
        multiD_valuesA.push(copyvaluesA.splice(0, colA));

      if (name.indexOf("colA") > -1) {
        multiD_valuesA.map(arr =>
          name === "colA+" ? arr.push(0) : arr.splice(-1)
        );
      } else {
        name === "rowA+"
          ? multiD_valuesA.push(new Array(colA).fill(0))
          : multiD_valuesA.pop();
      }
      const arr1d = [].concat(...multiD_valuesA);
      this.setState({
        matrixA: {
          rowA: newRowA,
          colA: newColA,
          valuesA: arr1d
        }
      });
    } else if (name.indexOf("B")) {
      if ((rowB <= 1 && name === "rowB-") || (colB <= 1 && name === "colB-")) {
        return;
      }
      const copyvaluesB = valuesB.slice();

      const newRowB =
        name === "rowB+" ? rowB + 1 : name === "rowB-" ? rowB - 1 : rowB;
      const newColB =
        name === "colB+" ? colB + 1 : name === "colB-" ? colB - 1 : colB;

      let multiD_valuesB = [];
      while (copyvaluesB.length)
        multiD_valuesB.push(copyvaluesB.splice(0, colB));

      if (name.indexOf("colB") > -1) {
        multiD_valuesB.map(arr =>
          name === "colB+" ? arr.push(0) : arr.splice(-1)
        );
      } else {
        name === "rowB+"
          ? multiD_valuesB.push(new Array(colB).fill(0))
          : multiD_valuesB.pop();
      }
      const arr1d = [].concat(...multiD_valuesB);
      this.setState({
        matrixB: {
          rowB: newRowB,
          colB: newColB,
          valuesB: arr1d
        }
      });
    }
  };
  render() {
    const { colA, valuesA } = this.state.matrixA;
    const { colB, valuesB } = this.state.matrixB;

    return (
      <div>
        <div className="d-flex flex-row  justify-content-around m-0 flex-wrap p-2">
          <div className="col d-flex flex-nowrap justify-content-center p-2 ">
            <MatrixComponent
              onChange={this.onChangeHandle}
              onClick={this.onClickHandle}
              className="A"
              values={valuesA}
              col={colA}
            />
          </div>
          <div className="col d-flex flex-nowrap justify-content-center p-2 ">
            <MatrixComponent
              onChange={this.onChangeHandle}
              onClick={this.onClickHandle}
              className="B"
              values={valuesB}
              col={colB}
            />
          </div>
        </div>

        <Buttons
          matrixA={this.state.matrixA}
          matrixB={this.state.matrixB}
          exchangeMatrice={this.exchangeMatrice}
        />
      </div>
    );
  }
}
export default MainContent;
