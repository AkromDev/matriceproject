import React, { Component } from "react";
import Matrix from "matrix-js";
import Output from "./Output";

class Buttons extends Component {
  state = {
    values: [],
    errors: "",
    det: null,
    input: 1
  };
  matrixOperation(matrixA, matrixB, e) {
    const name = e.target.name;
    const { colA, rowA, valuesA } = matrixA;
    const { colB, rowB, valuesB } = matrixB;

    const copyvaluesA = valuesA.slice().map(el => parseInt(el));
    const copyvaluesB = valuesB.slice().map(el => parseInt(el));

    const hasNaN_A = copyvaluesA.some(el => isNaN(el));
    const hasNaN_B = copyvaluesB.some(el => isNaN(el));

    if (hasNaN_A || hasNaN_B) {
      this.setState({
        errors: "Matrice can contain only numbers"
      });
      return;
    }
    const multiD_valuesA = [];
    while (copyvaluesA.length) multiD_valuesA.push(copyvaluesA.splice(0, colA));
    const multiD_valuesB = [];
    while (copyvaluesB.length) multiD_valuesB.push(copyvaluesB.splice(0, colB));
    const A = Matrix(multiD_valuesA);
    const B = Matrix(multiD_valuesB);

    if (name === "trans") {
      const C = A.trans();
      this.setState({
        values: C,
        errors: ""
      });
      return;
    }
    if (name === "det") {
      if (rowA !== colA) {
        this.setState({
          errors: "Only square matrices can have determinants"
        });
        return;
      }
      let C = A.det();
      C = C === -0 ? 0 : C;
      this.setState({
        values: null,
        det: C,
        errors: ""
      });
      return;
    }
    if (name !== "mul") {
      if (colA !== colB || rowA !== rowB) {
        const op = name === "add" ? "adding" : "subtracting";
        this.setState({
          errors: `For ${op} two matrices, their dimention must be equal`
        });
        return;
      }

      const C = name === "add" ? A.add(B) : A.sub(B);
      this.setState({
        values: C,
        errors: ""
      });
    } else {
      if (colA !== rowB) {
        this.setState({
          errors:
            "For multiplying two matrices, column of Matrix A should be equal to row of matrix B"
        });
        return;
      }
      const C = A.prod(B);
      this.setState({
        values: C,
        errors: ""
      });
    }
  }
  exchange = e => {
    const { exchangeMatrice } = this.props;
    exchangeMatrice(e);
  };
  handleScalar = e => {
    const value = this.state.input;
    const name = e.target.name;
    if (!value || name === "scalari") {
      return;
    }
    const { valuesA, colA } = this.props.matrixA;
    const copyvaluesA = valuesA.slice();
    const multiD_valuesA = [];
    while (copyvaluesA.length) multiD_valuesA.push(copyvaluesA.splice(0, colA));

    const output = multiD_valuesA.map(arr => arr.map(el => el * value));

    this.setState({
      values: output,
      errors: ""
    });
  };
  handleInput = e => {
    const { value } = e.target;
    this.setState({
      input: value
    });
  };

  render() {
    const { matrixA, matrixB } = this.props;
    return (
      <div>
        <div className="buttons">
          <div className="row1">
            <button
              className="btn btn-success"
              onClick={this.matrixOperation.bind(this, matrixA, matrixB)}
              name="add"
            >
              A+B
            </button>
            <button
              className="btn btn-success"
              onClick={this.matrixOperation.bind(this, matrixA, matrixB)}
              name="sub"
            >
              A-B
            </button>
            <button
              className="btn btn-success"
              onClick={this.matrixOperation.bind(this, matrixA, matrixB)}
              name="mul"
            >
              A*B
            </button>
            <button
              style={{ padding: "4px" }}
              className="btn btn-success"
              onClick={this.handleScalar}
              name="scalar"
            >
              A *{" "}
              <input
                className="scalar"
                id="scalar"
                value={this.state.input}
                onChange={this.handleInput}
                name="scalari"
                type="number"
                style={{ width: "50px" }}
              />
            </button>
          </div>
          <div className="row2">
            <button
              className="btn btn-success"
              onClick={this.matrixOperation.bind(this, matrixA, matrixB)}
              name="trans"
            >
              Tra[A]
            </button>
            <button
              className="btn btn-success"
              onClick={this.matrixOperation.bind(this, matrixA, matrixB)}
              name="det"
            >
              Det[A]
            </button>
            <button className="btn btn-success" onClick={this.exchange}>
              {"<--->"}
            </button>
          </div>
        </div>

        <Output matrix={this.state} />
      </div>
    );
  }
}
export default Buttons;
