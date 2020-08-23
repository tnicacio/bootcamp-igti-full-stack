import React from 'react';

export default function Card({ children }) {
  return <div style={styles.cardExtra}>{children}</div>;
}

const styles = {
  cardExtra: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid lightGrey',
    borderRadius: '5px',
    padding: '10px',
    margin: '1.2rem',
  },
};
