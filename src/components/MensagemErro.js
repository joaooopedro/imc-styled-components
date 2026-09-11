import React from 'react';
import styled from 'styled-components/native';

const TextoErro = styled.Text`
  color: ${({ theme }) => theme.cores.obesidade};
  font-size: ${({ theme }) => theme.fontes.pp};
  margin-top: ${({ theme }) => theme.espacos.p};
`;

// Sem mensagem, o componente nao renderiza nada.
export function MensagemErro({ mensagem }) {
  if (!mensagem) return null;
  return <TextoErro>{mensagem}</TextoErro>;
}

export default MensagemErro;
