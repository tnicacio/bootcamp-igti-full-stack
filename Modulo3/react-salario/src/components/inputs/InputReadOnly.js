import React, { Component } from 'react';
import { formatNumber } from '../../helpers/formatNumbers.js';
import css from './inputReadOnly.module.css';

export default class InputReadOnly extends Component {
  render() {
    const { description, value, percentage, color } = this.props;

    let valor = `R$ ${formatNumber(value)}`;
    console.log(valor);
    if (percentage) {
      valor = `${valor} (${formatNumber(percentage)}%)`;
    }

    return (
      <div className={css.teste}>
        <label className="active">{description}</label>
        <input
          type="text"
          style={{ fontWeight: 'bold', color: color }}
          readOnly
          value={valor}
        />
      </div>
    );
  }
}
