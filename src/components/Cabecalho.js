import React from 'react';
import styled from 'styled-components/native';
import { Titulo, Subtitulo } from './Texto';

const Area = styled.View`
  margin-bottom: ${({ theme }) => theme.espacos.g};
`;

export function Cabecalho({ titulo, subtitulo }) {
  return (
    <Area>
      <Titulo>{titulo}</Titulo>
      {subtitulo ? <Subtitulo>{subtitulo}</Subtitulo> : null}
    </Area>
  );
}

export default Cabecalho;
