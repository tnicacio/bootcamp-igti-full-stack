import React from 'react';
import { formatPercent } from '../../../helpers/format';

export default function PercentageValue({ color, value }) {
  const styles = {
    percentageValue: {
      marginRight: '10px',
      fontSize: '1.2rem',
      color: `${color}`,
    },
  };

  return <div style={styles.percentageValue}>{formatPercent(value)}</div>;
}
