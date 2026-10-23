# Calculadora de IMC com Firebase

Disciplina: Desenvolvimento Movel
Professor: Romualdo Monteiro de Resende Costa
Curso: Engenharia de Software (UniAcademia)

## O que a aplicacao faz

Aplicativo React Native que calcula o Indice de Massa Corporal a partir do peso e da altura
e armazena todos os calculos realizados pelo usuario no Firebase (Cloud Firestore).

Funcionalidades implementadas:
- Calculo de IMC com validacao de peso e altura, exibindo valor numerico, classificacao e tabela de faixas de referencia.
- Gravacao automatica de cada calculo valido no Firestore (`historico_imc`), registrando o valor calculado, a categoria, o peso, a altura e a data do calculo (`DD/MM/AAAA HH:mm`).
- Tela de Historico sincronizada em tempo real com o Firebase (`onSnapshot`), listando todos os valores calculados e suas datas.
- Opcao de apagar qualquer registro diretamente na tela de Historico (`deleteDoc`).

A altura aceita metros (1,75) ou centimetros (175). A virgula e convertida em ponto antes do calculo.
Valores fora das faixas aceitas geram mensagem de erro na tela.

## Como executar

Pelo navegador, sem instalar nada: https://snack.expo.dev/mlkc4CCapqWAqyVtYQUR0

Na maquina:

```
npm install
npx expo start
```

Depois, abrir no Expo Go pelo QR Code ou usar `a` para Android, `i` para iOS ou `w` para Web.

## Firebase

Projeto: `imc-joao-15467`, banco Cloud Firestore, colecao `historico_imc`.

Cada documento salvo tem:

| Campo | Exemplo |
| --- | --- |
| imc | 22.9 |
| categoria | Peso normal |
| peso | 70 |
| altura | 1.75 |
| data | 22/10/2026 21:34 |
| criadoEm | 1792715640000 |

As regras ficam em `firestore.rules`: a colecao pode ser lida, criada e apagada,
mas um registro salvo nao pode ser editado. Qualquer outra colecao fica fechada.

Para conferir os registros sem abrir o app:
https://firestore.googleapis.com/v1/projects/imc-joao-15467/databases/(default)/documents/historico_imc

## Estrutura

```
App.js                           ThemeProvider, escuta do Firebase e alternancia de telas
src/styles/theme.js              cores, espacamentos, fontes e raios
src/utils/imc.js                 calculo, validacao, classificacao e formatacao
src/services/firebase.js         conexao com o Firestore, gravacao, leitura em tempo real e exclusao
src/screens/TelaImc.js           tela da calculadora e envio do calculo ao Firebase
src/screens/TelaHistorico.js     tela de listagem dos calculos salvos e exclusao
src/components/                  componentes visuais reutilizaveis com Styled Components
```

## Componentes criados

| Componente | Arquivo | Papel |
| --- | --- | --- |
| Container, Conteudo, Coluna, Linha, Metade | Container.js | estrutura e leiaute da tela |
| Texto, Titulo, Subtitulo, Rotulo | Texto.js | tipografia derivada de um texto base |
| Cabecalho | Cabecalho.js | titulo e subtitulo da aplicacao |
| BarraNavegacao | BarraNavegacao.js | alternancia entre Calculadora e Historico |
| Secao | Secao.js | bloco de conteudo separado por uma linha de 1px |
| CampoEntrada | CampoEntrada.js | conjunto de Text com TextInput e unidade |
| Botao | Botao.js | acao principal da tela, com estado desabilitado |
| MensagemErro | MensagemErro.js | aviso de validacao ou de rede |
| ResultadoImc | ResultadoImc.js | valor e categoria do calculo |
| Etiqueta | Etiqueta.js | nome da categoria na cor da faixa |
| TabelaFaixas | TabelaFaixas.js | faixas de referencia, com a atual destacada |
| ItemHistorico | ItemHistorico.js | linha de registro salvo com IMC, data e botao de apagar |
| Separador | Separador.js | linha divisoria |

## Faixas de classificacao

| Faixa | IMC |
| --- | --- |
| Abaixo do peso | menor que 18,5 |
| Peso normal | 18,5 a 24,9 |
| Sobrepeso | 25,0 a 29,9 |
| Obesidade | 30,0 ou mais |
