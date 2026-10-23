import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import theme from './src/styles/theme';
import Container, { Conteudo } from './src/components/Container';
import Cabecalho from './src/components/Cabecalho';
import BarraNavegacao from './src/components/BarraNavegacao';
import TelaImc from './src/screens/TelaImc';
import TelaHistorico from './src/screens/TelaHistorico';
import { observarHistoricoImc } from './src/services/firebase';

// O ThemeProvider entrega o objeto de tema para todos os styled components
// da arvore, que o acessam pela prop "theme".
export default function App() {
  const [telaAtiva, setTelaAtiva] = useState('calculadora');
  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroLeitura, setErroLeitura] = useState('');

  useEffect(() => {
    const cancelar = observarHistoricoImc(
      (lista) => {
        setRegistros(lista);
        setCarregando(false);
        setErroLeitura('');
      },
      () => {
        setCarregando(false);
        setErroLeitura('Nao foi possivel carregar o historico do Firebase.');
      }
    );
    return () => cancelar();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="dark" />
      <Container>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Conteudo>
            <Cabecalho
              titulo="Calculadora de IMC"
              subtitulo="Registros sincronizados com o Firebase"
            />

            <BarraNavegacao
              telaAtiva={telaAtiva}
              aoTrocarTela={setTelaAtiva}
              totalRegistros={registros.length}
            />

            {telaAtiva === 'calculadora' ? (
              <TelaImc />
            ) : (
              <TelaHistorico
                registros={registros}
                carregando={carregando}
                erroLeitura={erroLeitura}
              />
            )}
          </Conteudo>
        </KeyboardAvoidingView>
      </Container>
    </ThemeProvider>
  );
}
