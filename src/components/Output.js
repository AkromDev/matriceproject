import React from "react";
import uuidv4 from "uuid/v4";
const Output = ({ matrix }) => {
  const { errors, values, det } = matrix;
  const data = errors
    ? errors
    : !values
    ? det
    : values.map(row => {
        const elements = row.map(el => (
          <input
            key={uuidv4()}
            size="3"
            type="text"
            className="AB"
            value={el}
          />
        ));
        return <div key={uuidv4()}>{elements}</div>;
      });

  return (
    <div className="outputcard">
      <div className="card text-center">
        <div className="card-header">
          <h5 className="card-title">Output displays below </h5>
        </div>
        <div className="card-body">
          <div className="card-text">{data}</div>
        </div>
      </div>
    </div>
  );
};

export default Output;
