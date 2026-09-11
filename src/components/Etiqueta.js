import styled from 'styled-components/native';

// Nome da categoria do IMC. E so texto colorido, sem tarja e sem borda:
// a cor ja carrega a informacao.
export const Etiqueta = styled.Text`
  font-size: ${({ theme }) => theme.fontes.m};
  font-weight: 600;
  color: ${({ theme, chaveCor }) => theme.cores[chaveCor]};
`;

export default Etiqueta;
