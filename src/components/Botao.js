import React from 'react';
import styled from 'styled-components/native';

const Base = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.raio.m};
  background-color: ${({ theme }) => theme.cores.primaria};
  opacity: ${({ desabilitado }) => (desabilitado ? 0.4 : 1)};
`;

const TextoBotao = styled.Text`
  font-size: ${({ theme }) => theme.fontes.p};
  font-weight: 600;
  color: ${({ theme }) => theme.cores.textoPrimaria};
`;

export function Botao({ titulo, aoPressionar, desabilitado }) {
  return (
    <Base desabilitado={desabilitado} disabled={desabilitado} onPress={aoPressionar}>
      <TextoBotao>{titulo}</TextoBotao>
    </Base>
  );
}

export default Botao;
