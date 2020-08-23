import React from 'react';
import Info from './Info';
import NumberValue from './NumberValue';
import CurrencyValue from './CurrencyValue';
import Balance from './Balance';
import PercentageValue from './PercentageValue';
import css from './installment.module.css';
import Card from './Card';

export default function installment({ installmentData }) {
  const { month, amount, balance, percentage } = installmentData;
  const color = balance >= 0 ? 'green' : 'red';

  return (
    <Card>
      <div className={css.flexRow}>
        <NumberValue color="black" value={month} />
        <Info>
          <CurrencyValue color={color} value={amount} />
          <Balance color={color} value={balance} />
          <PercentageValue
            color={balance >= 0 ? 'blue' : 'red'}
            value={percentage}
          />
        </Info>
      </div>
    </Card>
  );
}
