function calculator (a, b, c) {
  const promise = new Promise((resolve, reject) => {
    const isNotNumber = Array.from([a,b,c]).some((num) => typeof num !== 'number');
    if(isNotNumber) reject(new Error('Informe apenas números'))
    const calculate = () => (a + b) * c;
    if(calculate() < 50) reject(new Error(`Valor muito baixo: ${calculate()}`));

    resolve(calculate());
  });

  return promise;
}

module.exports = calculator;