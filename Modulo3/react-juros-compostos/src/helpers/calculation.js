function compoundInterest(initialCapital, interestRate, numberOfMonths) {
  const calculatedInfo = [];

  for (let t = 1; t <= numberOfMonths; t++) {
    const amount = initialCapital * (1 + interestRate / 100) ** t;
    const balance = amount - initialCapital;
    const percentage = (100 * balance) / initialCapital || 0;

    calculatedInfo.push({
      month: t,
      amount,
      balance,
      percentage,
    });
  }

  return calculatedInfo;
}

export { compoundInterest };
