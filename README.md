# Calculadora de IMC - Componentes e Styled Components

Disciplina: Desenvolvimento Movel
Professor: Romualdo Monteiro de Resende Costa
Curso: Engenharia de Software - UniAcademia
Entrega: Aula 11 de setembro - Desafio de Componentes e Styled Components

## Integrantes

- João Pedro Silva de Almeida
- Gabriel Caputo Morais
- Caio Castilho Soranço
- Nicolas Isaac Pinto de Jesus
- Jonathan Delmonte Pereira


## O que a aplicacao faz

Aplicativo React Native que calcula o Indice de Massa Corporal a partir do peso e da altura.
O resultado aparece com o valor numerico, a categoria correspondente e a tabela de faixas de
referencia, com a faixa atual destacada.

A altura aceita metros (1,75) ou centimetros (175). A virgula e convertida em ponto antes do calculo.
Valores fora das faixas aceitas geram mensagem de erro na tela.

## Como executar

```
npm install
npx expo start
```

Depois, abrir no Expo Go pelo QR Code ou usar `a` para Android e `i` para iOS.

## Estrutura

```
App.js                      ThemeProvider e ponto de entrada
src/styles/theme.js         cores, espacamentos, fontes e raios
src/utils/imc.js            calculo, validacao, classificacao e formatacao
src/screens/TelaImc.js      tela principal, estado e composicao dos componentes
src/components/             componentes reutilizaveis
```

## Componentes criados

| Componente | Arquivo | Papel |
| --- | --- | --- |
| Container, Conteudo, Coluna, Linha, Metade | Container.js | estrutura e leiaute da tela |
| Texto, Titulo, Subtitulo, Rotulo | Texto.js | tipografia derivada de um texto base |
| Cabecalho | Cabecalho.js | titulo da tela |
| Secao | Secao.js | bloco de conteudo separado por uma linha de 1px |
| CampoEntrada | CampoEntrada.js | conjunto de Text com TextInput e unidade |
| Botao | Botao.js | acao unica da tela, com estado desabilitado |
| MensagemErro | MensagemErro.js | aviso de validacao abaixo dos campos |
| ResultadoImc | ResultadoImc.js | valor e categoria do calculo |
| Etiqueta | Etiqueta.js | nome da categoria na cor da faixa |
| TabelaFaixas | TabelaFaixas.js | faixas de referencia, com a atual destacada |
| Separador | Separador.js | linha divisoria |

## Decisoes de interface

A tela e plana de proposito: sem cartao, sem sombra, sem gradiente, sem canto
arredondado grande. A separacao entre blocos vem de uma linha de 1px e do espaco
em volta. O raio maximo usado e 4px, so nos campos e no botao.

A cor aparece em dois lugares apenas, sempre carregando informacao: a categoria
do resultado e a linha correspondente na tabela de faixas. O botao usa o preto do
tema, nao uma cor de destaque, para nao competir com o resultado.

A tela tem uma acao so. O botao Limpar foi retirado porque os campos ja podem ser
editados direto, e a frase de apoio abaixo do resultado saiu porque a tabela de
faixas logo abaixo ja diz a mesma coisa.

Quando a validacao falha, alem da mensagem, o campo responsavel pelo erro fica
com a borda vermelha. Isso vem do campo `campo` devolvido por `calcularImc`.

O rodape com os nomes dos integrantes foi retirado da tela. Os nomes ficam
registrados neste README.

## Faixas de classificacao

| Faixa | IMC |
| --- | --- |
| Abaixo do peso | menor que 18,5 |
| Peso normal | 18,5 a 24,9 |
| Sobrepeso | 25,0 a 29,9 |
| Obesidade | 30,0 ou mais |


