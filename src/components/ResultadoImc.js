import React from 'react';
import styled from 'styled-components/native';
import Secao from './Secao';
import { Subtitulo } from './Texto';
import Etiqueta from './Etiqueta';
import { formatarImc } from '../utils/imc';

const Numero = styled.Text`
  font-size: ${({ theme }) => theme.fontes.numero};
  font-weight: 600;
  color: ${({ theme }) => theme.cores.texto};
  margin-bottom: ${({ theme }) => theme.espacos.pp};
`;

const Espera = styled(Subtitulo)`
  font-size: ${({ theme }) => theme.fontes.p};
`;

export function ResultadoImc({ resultado }) {
  // Antes do primeiro calculo, uma linha explica o que fazer.
  if (!resultado) {
    return (
      <Secao>
        <Espera>Informe peso e altura para ver o resultado.</Espera>
      </Secao>
    );
  }

  const { valor, categoria, chaveCor } = resultado;

  return (
    <Secao>
      <Numero>{formatarImc(valor)}</Numero>
      <Etiqueta chaveCor={chaveCor}>{categoria}</Etiqueta>
    </Secao>
  );
}

export default ResultadoImc;
