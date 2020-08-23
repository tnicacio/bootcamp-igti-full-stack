import React from 'react';
import Layout from './components/layout/Layout';
import Form from './components/form/Form';
import Installments from './components/installments/Installments';
import { compoundInterest } from './helpers/calculation';

export default function App() {
  const [montante, setMontante] = React.useState(0);
  const [taxaMensal, setTaxaMensal] = React.useState(0);
  const [parcelas, setParcelas] = React.useState(1);
  const [cardsData, setCardsData] = React.useState([]);

  React.useEffect(() => {
    const newCardsData = compoundInterest(montante, taxaMensal, parcelas);
    setCardsData(newCardsData);
  }, [montante, taxaMensal, parcelas]);

  const inputs = [
    {
      id: 'montante',
      label: 'Montante inicial:',
      value: montante,
      min: 0,
      max: 100_000,
      step: 100,
      callback: ({ target }) => setMontante(Number(target.value)),
    },
    {
      id: 'taxa-mensal',
      label: 'Taxa de juros mensal:',
      value: taxaMensal,
      min: -12,
      max: 12,
      step: 0.1,
      callback: ({ target }) => setTaxaMensal(Number(target.value)),
    },
    {
      id: 'parcelas',
      label: 'Período (meses):',
      value: parcelas,
      min: 1,
      max: 36,
      step: 1,
      callback: ({ target }) => setParcelas(Number(target.value)),
    },
  ];

  return (
    <Layout>
      <Form inputs={inputs} />
      <Installments data={cardsData} />
    </Layout>
  );
}
