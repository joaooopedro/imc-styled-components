import React from 'react';
import styled from 'styled-components/native';
import { Rotulo } from './Texto';

// Bloco de conteudo. No lugar de um cartao com borda e sombra, a separacao
// e feita por uma linha de 1px e pelo espaco em volta.
const Area = styled.View`
  padding-top: ${({ theme }) => theme.espacos.g};
  border-top-width: ${({ semLinha }) => (semLinha ? '0px' : '1px')};
  border-top-color: ${({ theme }) => theme.cores.linha};
`;

export function Secao({ titulo, semLinha, children }) {
  return (
    <Area semLinha={semLinha}>
      {titulo ? <Rotulo>{titulo}</Rotulo> : null}
      {children}
    </Area>
  );
}

export default Secao;
