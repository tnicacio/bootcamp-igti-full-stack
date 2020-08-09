import React, { Component } from 'react';

export default class InputFullSalary extends Component {
  handleInputChange = (event) => {
    const newValue = +event.target.value;
    this.props.onChangeSalary(newValue);
  };

  render() {
    const { fullSalary } = this.props;
    return (
      <div style={{ padding: '10px' }}>
        <label className="active" htmlFor="full-salary">
          {this.props.description}
        </label>
        <input
          type="number"
          value={fullSalary}
          onChange={this.handleInputChange}
          min="0"
          step="100"
        />
      </div>
    );
  }
}
