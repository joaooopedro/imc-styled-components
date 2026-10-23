import React, { useState } from 'react';

import { Coluna, Linha, Metade } from '../components/Container';
import Secao from '../components/Secao';
import CampoEntrada from '../components/CampoEntrada';
import Botao from '../components/Botao';
import MensagemErro from '../components/MensagemErro';
import ResultadoImc from '../components/ResultadoImc';
import TabelaFaixas from '../components/TabelaFaixas';

import { calcularImc, normalizarAltura, paraNumero } from '../utils/imc';
import { salvarCalculoImc } from '../services/firebase';

export function TelaImc() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');
  const [campoInvalido, setCampoInvalido] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function aoCalcular() {
    const saida = calcularImc(peso, altura);
    if (!saida.ok) {
      setErro(saida.erro);
      setCampoInvalido(saida.campo);
      setResultado(null);
      return;
    }

    setErro('');
    setCampoInvalido('');
    setResultado(saida);

    // Registra o calculo e a data no Firebase.
    setSalvando(true);
    try {
      await salvarCalculoImc({
        valor: saida.valor,
        categoria: saida.categoria,
        chaveCor: saida.chaveCor,
        peso: paraNumero(peso),
        altura: normalizarAltura(paraNumero(altura)),
      });
    } catch (e) {
      setErro('Calculo exibido, mas nao foi possivel salvar no Firebase.');
    } finally {
      setSalvando(false);
    }
  }

  const podeCalcular = peso.length > 0 && altura.length > 0 && !salvando;

  return (
    <Coluna>
      <Secao semLinha>
        <Linha>
          <Metade>
            <CampoEntrada
              rotulo="Peso"
              valor={peso}
              aoMudar={setPeso}
              placeholder="70"
              sufixo="kg"
              temErro={campoInvalido === 'peso'}
            />
          </Metade>
          <Metade>
            <CampoEntrada
              rotulo="Altura"
              valor={altura}
              aoMudar={setAltura}
              placeholder="1,75"
              sufixo="m"
              temErro={campoInvalido === 'altura'}
            />
          </Metade>
        </Linha>

        <MensagemErro mensagem={erro} />
      </Secao>

      <Botao
        titulo={salvando ? 'Salvando...' : 'Calcular'}
        aoPressionar={aoCalcular}
        desabilitado={!podeCalcular}
      />

      <ResultadoImc resultado={resultado} />

      <TabelaFaixas chaveCorAtiva={resultado ? resultado.chaveCor : null} />
    </Coluna>
  );
}

export default TelaImc;
