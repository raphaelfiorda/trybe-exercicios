const fs = require('fs');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
chai.use(sinonChai);

const function2 = require('../function2');

const pathContent = 'Conteúdo inserido com sucesso';

describe('Testa a function2', () => {
  describe('Quando o arquivo existe', () => {
    afterEach(() => sinon.restore())
    const validResult = function2('path.txt', pathContent)

    it('O conteúdo escrito é uma string', () => {
      expect(validResult).to.be.a('string')
    });

    it('O conteúdo é igual ao previsto e retorna ok', () => {
      expect(validResult).to.equals('ok');
    });
  });

  describe('Quando o arquivo é inexistente', () => {
    const nullResult = function2('not-a-path.txt', null)
    
    it('A resposta retorna "null"', () => {
    expect(nullResult).to.be.equal(null);
    })
  })
});