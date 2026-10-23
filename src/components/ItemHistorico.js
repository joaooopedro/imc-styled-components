import React from 'react';
import styled from 'styled-components/native';
import { Texto, Subtitulo } from './Texto';
import Etiqueta from './Etiqueta';
import { formatarImc } from '../utils/imc';

const LinhaItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: ${({ theme }) => theme.espacos.m};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.cores.linha};
`;

const BlocoDados = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.espacos.pp};
`;

const LinhaTopo = styled.View`
  flex-direction: row;
  align-items: baseline;
  gap: ${({ theme }) => theme.espacos.m};
`;

const ValorImc = styled(Texto)`
  font-size: ${({ theme }) => theme.fontes.g};
  font-weight: 600;
`;

const BotaoApagar = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  padding-vertical: ${({ theme }) => theme.espacos.p};
  padding-horizontal: ${({ theme }) => theme.espacos.m};
  border-width: 1px;
  border-color: ${({ theme }) => theme.cores.linha};
  border-radius: ${({ theme }) => theme.raio.m};
  opacity: ${({ desabilitado }) => (desabilitado ? 0.4 : 1)};
`;

const TextoApagar = styled(Texto)`
  font-size: ${({ theme }) => theme.fontes.pp};
  color: ${({ theme }) => theme.cores.obesidade};
  font-weight: 600;
`;

// Exibe um registro salvo no Firebase com IMC, classificacao, medidas, data e acao de apagar.
export function ItemHistorico({ item, aoApagar, apagando }) {
  const imcFormatado =
    typeof item.imc === 'number' ? formatarImc(item.imc) : String(item.imc);

  const medidas =
    item.peso && item.altura
      ? `${String(item.peso).replace('.', ',')} kg · ${String(item.altura).replace('.', ',')} m · `
      : '';

  return (
    <LinhaItem>
      <BlocoDados>
        <LinhaTopo>
          <ValorImc>IMC {imcFormatado}</ValorImc>
          <Etiqueta chaveCor={item.chaveCor || 'normal'}>
            {item.categoria || 'Calculado'}
          </Etiqueta>
        </LinhaTopo>
        <Subtitulo>
          {medidas}
          {item.data}
        </Subtitulo>
      </BlocoDados>

      <BotaoApagar
        desabilitado={apagando}
        disabled={apagando}
        onPress={() => aoApagar(item.id)}
      >
        <TextoApagar>{apagando ? 'Apagando...' : 'Apagar'}</TextoApagar>
      </BotaoApagar>
    </LinhaItem>
  );
}

export default ItemHistorico;
