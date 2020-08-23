import React from 'react';

export default function NumberValue({ color, value }) {
  const styles = {
    numberValue: {
      marginRight: '10px',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: `${color}`,
    },
  };

  return <div style={styles.numberValue}>{value}</div>;
}
