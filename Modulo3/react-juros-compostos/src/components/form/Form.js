import React from 'react';
import NumberInput from './input/NumberInput';

export default function Form({ inputs }) {
  return (
    <div className="row">
      {inputs.map((item) => {
        return <NumberInput key={item.id} specs={item} />;
      })}
    </div>
  );
}
