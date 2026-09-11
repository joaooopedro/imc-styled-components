import styled from 'styled-components/native';

// Container raiz da tela.
export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.cores.fundo};
`;

// Area rolavel. O contentContainerStyle vem por atributo porque o ScrollView
// nao aceita padding direto no style do styled components.
export const Conteudo = styled.ScrollView.attrs(({ theme }) => ({
  contentContainerStyle: {
    padding: parseInt(theme.espacos.g, 10),
    paddingTop: parseInt(theme.espacos.gg, 10),
    paddingBottom: parseInt(theme.espacos.gg, 10),
    maxWidth: 560,
    width: '100%',
    alignSelf: 'center',
  },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
`;

// Empilha os filhos com espaco vertical entre eles.
export const Coluna = styled.View`
  width: 100%;
  gap: ${({ theme }) => theme.espacos.g};
`;

// Coloca os filhos lado a lado, em partes iguais.
export const Linha = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.espacos.m};
`;

// Usado dentro de Linha para cada item ocupar metade da largura.
export const Metade = styled.View`
  flex: 1;
`;

export default Container;
