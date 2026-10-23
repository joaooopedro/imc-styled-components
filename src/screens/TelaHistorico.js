import React, { useState } from 'react';
import styled from 'styled-components/native';

import Secao from '../components/Secao';
import { Subtitulo } from '../components/Texto';
import MensagemErro from '../components/MensagemErro';
import ItemHistorico from '../components/ItemHistorico';
import { excluirCalculoImc } from '../services/firebase';

const Lista = styled.View`
  width: 100%;
`;

export function TelaHistorico({ registros, carregando, erroLeitura }) {
  const [idApagando, setIdApagando] = useState(null);
  const [erroExclusao, setErroExclusao] = useState('');

  async function aoApagar(id) {
    setErroExclusao('');
    setIdApagando(id);
    try {
      await excluirCalculoImc(id);
    } catch (e) {
      setErroExclusao('Nao foi possivel apagar o registro no Firebase.');
    } finally {
      setIdApagando(null);
    }
  }

  if (carregando) {
    return (
      <Secao semLinha>
        <Subtitulo>Carregando registros do Firebase...</Subtitulo>
      </Secao>
    );
  }

  return (
    <Secao semLinha>
      <MensagemErro mensagem={erroLeitura || erroExclusao} />

      {registros.length === 0 ? (
        <Subtitulo>Nenhum calculo registrado ate o momento.</Subtitulo>
      ) : (
        <Lista>
          {registros.map((item) => (
            <ItemHistorico
              key={item.id}
              item={item}
              aoApagar={aoApagar}
              apagando={idApagando === item.id}
            />
          ))}
        </Lista>
      )}
    </Secao>
  );
}

export default TelaHistorico;
