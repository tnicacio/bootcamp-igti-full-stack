import React from 'react';
import { formatCurrency } from '../../../helpers/format';

export default function Balance({ color, value }) {
  const styles = {
    balanceValue: {
      marginRight: '10px',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: `${color}`,
    },
  };

  return (
    <div style={styles.balanceValue}>
      {`${value >= 0 ? '+' : ''}${formatCurrency(value)}`}
    </div>
  );
}
