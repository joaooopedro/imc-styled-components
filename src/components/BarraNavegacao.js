import React from 'react';
import styled from 'styled-components/native';

const Barra = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.cores.linha};
  margin-bottom: ${({ theme }) => theme.espacos.g};
`;

const Aba = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex: 1;
  padding-vertical: ${({ theme }) => theme.espacos.m};
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, ativa }) =>
    ativa ? theme.cores.primaria : 'transparent'};
`;

const TextoAba = styled.Text`
  font-size: ${({ theme }) => theme.fontes.p};
  font-weight: ${({ ativa }) => (ativa ? '600' : '400')};
  color: ${({ theme, ativa }) =>
    ativa ? theme.cores.texto : theme.cores.textoFraco};
`;

// Alterna entre a tela de calculo e a tela de historico.
export function BarraNavegacao({ telaAtiva, aoTrocarTela, totalRegistros }) {
  const rotuloHistorico =
    totalRegistros > 0 ? `Historico (${totalRegistros})` : 'Historico';

  return (
    <Barra>
      <Aba
        ativa={telaAtiva === 'calculadora'}
        onPress={() => aoTrocarTela('calculadora')}
      >
        <TextoAba ativa={telaAtiva === 'calculadora'}>Calculadora</TextoAba>
      </Aba>
      <Aba
        ativa={telaAtiva === 'historico'}
        onPress={() => aoTrocarTela('historico')}
      >
        <TextoAba ativa={telaAtiva === 'historico'}>{rotuloHistorico}</TextoAba>
      </Aba>
    </Barra>
  );
}

export default BarraNavegacao;
