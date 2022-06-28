const function1 = (number) => {
  if(isNaN(number)) throw new Error('o valor deve ser um número');
  if(number > 0) return 'positivo';
  if(number < 0) return 'negativo';
  if(number === 0) return 'neutro';
  };

function1(5);

module.exports = function1;