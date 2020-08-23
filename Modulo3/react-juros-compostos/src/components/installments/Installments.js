import React from 'react';
import Installment from './installment/Installment';

export default function Installments({ data }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {data.map((item) => {
        return <Installment key={item.month} installmentData={item} />;
      })}
    </div>
  );
}
