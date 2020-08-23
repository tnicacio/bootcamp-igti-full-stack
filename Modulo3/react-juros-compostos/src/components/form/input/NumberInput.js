import React from 'react';

export default function NumberInput({ specs }) {
  const { id, label, value, min, max, step, callback } = specs;

  return (
    <div className="input-field col s2">
      <input
        id={id}
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={callback}
      />
      <label htmlFor={id} className="active">
        {`${label}:`}{' '}
      </label>
    </div>
  );
}
