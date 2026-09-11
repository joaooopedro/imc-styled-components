// Tema central da aplicacao.
// Um unico lugar define cores, espacamentos, fontes e raios, e todos os
// styled components leem esses valores pela prop "theme".
export const theme = {
  cores: {
    fundo: '#FFFFFF',
    linha: '#E4E4E7',
    texto: '#18181B',
    textoFraco: '#71717A',
    primaria: '#18181B',
    textoPrimaria: '#FFFFFF',

    // Cores das faixas de IMC. Usadas so no resultado e na tabela,
    // nunca como decoracao.
    abaixo: '#1D4ED8',
    normal: '#15803D',
    sobrepeso: '#A16207',
    obesidade: '#B91C1C',
  },
  espacos: {
    pp: '4px',
    p: '8px',
    m: '16px',
    g: '24px',
    gg: '40px',
  },
  fontes: {
    pp: '13px',
    p: '15px',
    m: '17px',
    g: '20px',
    titulo: '24px',
    numero: '44px',
  },
  raio: {
    p: '2px',
    m: '4px',
  },
};

export default theme;
