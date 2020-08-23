import React from 'react';
import { formatCurrency } from '../../../helpers/format';

export default function CurrencyValue({ color, value }) {
  const styles = {
    currencyValue: {
      marginRight: '10px',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: `${color}`,
    },
  };

  return <div style={styles.currencyValue}>{formatCurrency(value)}</div>;
}
