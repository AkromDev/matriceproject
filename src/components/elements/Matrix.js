import React from "react";
import plus from "../../img/plus.png";
import minus from "../../img/minus.png";

const Input = ({ className, values, col, onChange, onClick }) => {
  const onClickHandle = e => {
    onClick(e);
  };
  const onChangeHandle = e => {
    onChange(e);
  };

  const data = values.map((value, index) => {
    return (
      <React.Fragment key={index}>
        <input
          size="2"
          type="text"
          className={className}
          value={value}
          name={index}
          onChange={onChangeHandle}
        />
        {(index + 1) % col === 0 ? <br /> : null}
      </React.Fragment>
    );
  });
  const copyvalues = data.slice();
  let multiD_values = [];
  while (copyvalues.length) {
    multiD_values.push(<div>{copyvalues.splice(0, col)}</div>);
  }

  return (
    <div className="grid">
      <div className="item1">
        <button
          className="row-add"
          onClick={onClickHandle}
          name={`row${className}+`}
        >
          <img src={plus} name={`row${className}+`} alt="+" width="20px" />
        </button>

        <button
          className="row-sub"
          onClick={onClickHandle}
          name={`row${className}-`}
        >
          <img src={minus} name={`row${className}-`} alt="-" width="20px" />
        </button>
      </div>

      <div className="item2">
        <button
          className="col-sub"
          onClick={onClickHandle}
          name={`col${className}-`}
        >
          <img src={minus} name={`col${className}-`} width="20px" alt="-" />
        </button>
        <button
          className="col-add"
          onClick={onClickHandle}
          name={`col${className}+`}
        >
          <img src={plus} name={`col${className}+`} width="20px" alt="+" />
        </button>
      </div>

      <div className="item3">{data}</div>
    </div>
  );
};

export default Input;
