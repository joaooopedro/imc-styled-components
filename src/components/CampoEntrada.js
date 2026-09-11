import React from 'react';
import styled from 'styled-components/native';
import { Rotulo, Texto } from './Texto';

const Area = styled.View`
  width: 100%;
`;

// A caixa envolve o TextInput e a unidade na mesma linha.
// A borda fica vermelha quando o campo esta com erro.
const Caixa = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${({ theme, temErro }) =>
    temErro ? theme.cores.obesidade : theme.cores.linha};
  border-radius: ${({ theme }) => theme.raio.m};
  padding: 0 ${({ theme }) => theme.espacos.m};
`;

const Entrada = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.cores.textoFraco,
  keyboardType: 'numeric',
}))`
  flex: 1;
  height: 48px;
  color: ${({ theme }) => theme.cores.texto};
  font-size: ${({ theme }) => theme.fontes.m};
`;

const Unidade = styled(Texto)`
  color: ${({ theme }) => theme.cores.textoFraco};
  font-size: ${({ theme }) => theme.fontes.pp};
`;

// Componente pedido no enunciado: o conjunto de Text com TextInput.
export function CampoEntrada({
  rotulo,
  valor,
  aoMudar,
  placeholder,
  sufixo,
  temErro,
}) {
  return (
    <Area>
      <Rotulo>{rotulo}</Rotulo>
      <Caixa temErro={temErro}>
        <Entrada value={valor} onChangeText={aoMudar} placeholder={placeholder} />
        {sufixo ? <Unidade>{sufixo}</Unidade> : null}
      </Caixa>
    </Area>
  );
}

export default CampoEntrada;
