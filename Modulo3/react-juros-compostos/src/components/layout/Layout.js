import React from 'react';
import Header from './header/Header';

export default function Layout({ children }) {
  return (
    <div className="container">
      <Header title="React - Juros Compostos" />
      {children}
    </div>
  );
}
