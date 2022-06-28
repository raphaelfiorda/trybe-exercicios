const { expect } = require('chai');

const function1 = require('../function1');

describe('Testa a function1', () => {
  it('Lança um erro quando não passado um número', () => {
    const message = 'o valor deve ser um número';

    expect(() => function1('sete')).to.throw(message);
  });

  it('Quando maior que zero, retorna "positivo"', () => {
    const positivo = function1(5);

    expect(positivo).to.be.equal('positivo');
  });

  it('Quando igual à zero, retorna "neutro"', () => {
    const neutro = function1(0);

    expect(neutro).to.be.equal('neutro');
  });

  it('Quando menor que zero, retorna "negativo"', () => {
    const negativo = function1(-5);

    expect(negativo).to.be.equal('negativo');
  });
});