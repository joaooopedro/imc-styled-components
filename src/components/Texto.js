import styled, { css } from 'styled-components/native';

// Texto base. Titulo, Subtitulo e Rotulo herdam dele, entao a cor e o tamanho
// padrao ficam definidos em um unico ponto.
export const Texto = styled.Text`
  color: ${({ theme }) => theme.cores.texto};
  font-size: ${({ theme }) => theme.fontes.p};

  ${({ centralizado }) =>
    centralizado &&
    css`
      text-align: center;
    `}
`;

export const Titulo = styled(Texto)`
  font-size: ${({ theme }) => theme.fontes.titulo};
  font-weight: 600;
`;

export const Subtitulo = styled(Texto)`
  font-size: ${({ theme }) => theme.fontes.pp};
  color: ${({ theme }) => theme.cores.textoFraco};
`;

export const Rotulo = styled(Texto)`
  font-size: ${({ theme }) => theme.fontes.pp};
  color: ${({ theme }) => theme.cores.textoFraco};
  margin-bottom: ${({ theme }) => theme.espacos.p};
`;

export default Texto;
