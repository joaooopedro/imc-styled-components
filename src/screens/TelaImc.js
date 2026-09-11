import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import Container, { Conteudo, Coluna, Linha, Metade } from '../components/Container';
import Cabecalho from '../components/Cabecalho';
import Secao from '../components/Secao';
import CampoEntrada from '../components/CampoEntrada';
import Botao from '../components/Botao';
import MensagemErro from '../components/MensagemErro';
import ResultadoImc from '../components/ResultadoImc';
import TabelaFaixas from '../components/TabelaFaixas';

import { calcularImc } from '../utils/imc';

export function TelaImc() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');
  const [campoInvalido, setCampoInvalido] = useState('');

  function aoCalcular() {
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
  }

  const podeCalcular = peso.length > 0 && altura.length > 0;

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Conteudo>
          <Cabecalho titulo="Calculadora de IMC" />

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
              titulo="Calcular"
              aoPressionar={aoCalcular}
              desabilitado={!podeCalcular}
            />

            <ResultadoImc resultado={resultado} />

            <TabelaFaixas chaveCorAtiva={resultado ? resultado.chaveCor : null} />
          </Coluna>
        </Conteudo>
      </KeyboardAvoidingView>
    </Container>
  );
}

export default TelaImc;
