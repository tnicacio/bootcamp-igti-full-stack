import React from 'react';

export default function Header({ title }) {
  return (
    <div className="header" style={styles.headerStyle}>
      <span>{title}</span>
    </div>
  );
}

const styles = {
  headerStyle: {
    fontSize: '3.5em',
    textAlign: 'center',
    padding: '20px',
  },
};
