import React from 'react';
import styled from 'styled-components/native';
import Secao from './Secao';
import { Texto } from './Texto';
import { FAIXAS } from '../utils/imc';

const LinhaFaixa = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.espacos.p} 0;
`;

// A faixa correspondente ao resultado atual recebe a cor da categoria e
// negrito. As demais ficam em cinza.
const Nome = styled(Texto)`
  color: ${({ theme, ativa, chaveCor }) =>
    ativa ? theme.cores[chaveCor] : theme.cores.texto};
  font-weight: ${({ ativa }) => (ativa ? '600' : 'normal')};
`;

const Intervalo = styled(Texto)`
  color: ${({ theme }) => theme.cores.textoFraco};
  font-size: ${({ theme }) => theme.fontes.pp};
`;

export function TabelaFaixas({ chaveCorAtiva }) {
  return (
    <Secao titulo="Faixas de referencia">
      {FAIXAS.map((faixa) => (
        <LinhaFaixa key={faixa.chaveCor}>
          <Nome ativa={faixa.chaveCor === chaveCorAtiva} chaveCor={faixa.chaveCor}>
            {faixa.rotulo}
          </Nome>
          <Intervalo>{faixa.intervalo}</Intervalo>
        </LinhaFaixa>
      ))}
    </Secao>
  );
}

export default TabelaFaixas;
