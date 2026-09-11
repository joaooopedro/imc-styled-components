// Regras de negocio do calculo do IMC.
// Ficam separadas dos componentes para poderem ser testadas e reaproveitadas.

// Converte o texto digitado em numero.
// O usuario pode digitar com virgula, entao a virgula vira ponto.
export function paraNumero(texto) {
  if (!texto) return NaN;
  return Number(String(texto).replace(',', '.'));
}

// Aceita altura em metros (1,75) ou em centimetros (175).
// Se o valor for maior que 3, assume que veio em centimetros.
export function normalizarAltura(valor) {
  if (Number.isNaN(valor)) return NaN;
  return valor > 3 ? valor / 100 : valor;
}

// IMC = peso / (altura * altura)
export function calcularImc(pesoTexto, alturaTexto) {
  const peso = paraNumero(pesoTexto);
  const altura = normalizarAltura(paraNumero(alturaTexto));

  // "campo" diz qual entrada destacar na tela.
  if (Number.isNaN(peso) || Number.isNaN(altura)) {
    return {
      ok: false,
      campo: Number.isNaN(peso) ? 'peso' : 'altura',
      erro: 'Preencha peso e altura com numeros validos.',
    };
  }
  if (peso <= 0 || peso > 500) {
    return {
      ok: false,
      campo: 'peso',
      erro: 'Peso fora da faixa aceita (0 a 500 kg).',
    };
  }
  if (altura <= 0.5 || altura > 2.5) {
    return {
      ok: false,
      campo: 'altura',
      erro: 'Altura fora da faixa aceita (0,5 a 2,5 m).',
    };
  }

  const valor = peso / (altura * altura);
  return { ok: true, valor, ...classificar(valor) };
}

// Tabela de classificacao usada pela Organizacao Mundial da Saude.
export function classificar(imc) {
  if (imc < 18.5) {
    return {
      categoria: 'Abaixo do peso',
      chaveCor: 'abaixo',
      mensagem: 'Seu peso esta abaixo da faixa recomendada.',
    };
  }
  if (imc < 25) {
    return {
      categoria: 'Peso normal',
      chaveCor: 'normal',
      mensagem: 'Seu peso esta dentro da faixa recomendada.',
    };
  }
  if (imc < 30) {
    return {
      categoria: 'Sobrepeso',
      chaveCor: 'sobrepeso',
      mensagem: 'Seu peso esta um pouco acima da faixa recomendada.',
    };
  }
  return {
    categoria: 'Obesidade',
    chaveCor: 'obesidade',
    mensagem: 'Procure acompanhamento de um profissional de saude.',
  };
}

// Lista usada pelo componente que mostra a tabela de faixas.
export const FAIXAS = [
  { rotulo: 'Abaixo do peso', intervalo: 'menor que 18,5', chaveCor: 'abaixo' },
  { rotulo: 'Peso normal', intervalo: '18,5 a 24,9', chaveCor: 'normal' },
  { rotulo: 'Sobrepeso', intervalo: '25,0 a 29,9', chaveCor: 'sobrepeso' },
  { rotulo: 'Obesidade', intervalo: '30,0 ou mais', chaveCor: 'obesidade' },
];

// Formata o numero com uma casa decimal e virgula, padrao brasileiro.
export function formatarImc(valor) {
  return valor.toFixed(1).replace('.', ',');
}
