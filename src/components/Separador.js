import styled from 'styled-components/native';

// Linha de 1px usada entre blocos de conteudo.
export const Separador = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.cores.linha};
`;

export default Separador;
