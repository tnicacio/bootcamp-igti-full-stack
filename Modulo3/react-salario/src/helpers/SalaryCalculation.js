function getINSSDiscount(bruteSalary) {
  try {
    if (bruteSalary < 1045) {
      return 0;
    }

    if (bruteSalary === 1045) {
      return bruteSalary * 0.075;
    }

    if (bruteSalary > 6101.06) {
      return 713.1;
    }

    let minValues = [1045, 2089.6, 3134.4, 6101.06];
    let aliquotas = [0.075, 0.09, 0.12, 0.14];

    let i = 0;
    let discount = minValues[i] * aliquotas[i];

    for (i = 0; i < minValues.length - 1; i++) {
      if (bruteSalary > minValues[i]) {
        if (bruteSalary > minValues[i + 1]) {
          discount += (minValues[i + 1] - minValues[i]) * aliquotas[i + 1];
        } else {
          discount += (bruteSalary - minValues[i]) * aliquotas[i + 1];
          break;
        }
      }
    }
    return discount;
  } catch (err) {
    console.log({ error: err.message });
  }
}

function getIRPFDiscountFromIRPFBase(remainder) {
  try {
    const maxValues = [1903.98, 2826.65, 3751.05, 4664.68];
    const aliquotas = [0.075, 0.15, 0.225, 0.275];
    const deductiblePart = [142.8, 354.8, 636.13, 869.36];

    if (remainder <= maxValues[0]) {
      return 0;
    }

    const lastIndex = maxValues.length - 1;

    if (remainder > maxValues[lastIndex]) {
      return remainder * aliquotas[lastIndex] - deductiblePart[lastIndex];
    }

    for (let i = 0; i < lastIndex; i++) {
      if (remainder > maxValues[i] && remainder <= maxValues[i + 1]) {
        return remainder * aliquotas[i] - deductiblePart[i];
      }
    }
  } catch (err) {
    console.log({ error: err.message });
  }
}

function getSalaryData(bruteSalary) {
  const baseINSS = +bruteSalary;
  const discountINSS = getINSSDiscount(baseINSS);
  const discountINSSPercentage = (100 * discountINSS) / baseINSS;
  const baseIRPF = baseINSS - discountINSS;
  const discountIRPF = getIRPFDiscountFromIRPFBase(baseIRPF);
  const discountIRPFPercentage = (100 * discountIRPF) / baseINSS;
  const liquidSalary = baseINSS - (discountINSS + discountIRPF);
  const liquidSalaryPercentage = (100 * liquidSalary) / baseINSS;

  return {
    baseINSS,
    discountINSS,
    discountINSSPercentage,
    baseIRPF,
    discountIRPF,
    discountIRPFPercentage,
    liquidSalary,
    liquidSalaryPercentage,
  };
}

export { getSalaryData };
