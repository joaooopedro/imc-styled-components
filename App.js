import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import theme from './src/styles/theme';
import TelaImc from './src/screens/TelaImc';

// O ThemeProvider entrega o objeto de tema para todos os styled components
// da arvore, que o acessam pela prop "theme".
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="dark" />
      <TelaImc />
    </ThemeProvider>
  );
}
