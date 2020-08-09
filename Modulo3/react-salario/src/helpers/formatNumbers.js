const formatter = new Intl.NumberFormat('pt-BR');

function formatNumber(numberToFormat, decimals = 2) {
  return formatter.format(numberToFormat.toFixed(decimals));
}

export { formatNumber };
