import React, { Component } from 'react';

export default class ProgressBarSalary extends Component {
  render() {
    const { value, color } = this.props;

    return (
      <div
        className="liquidSalary"
        style={{
          marginTop: '40px',
          width: value + '%',
          height: '20px',
          backgroundColor: color,
        }}
      />
    );
  }
}
