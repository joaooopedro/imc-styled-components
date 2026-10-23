import firebase from './Firebase';

const COLECAO_IMC = 'historico_imc';

// Formata a data atual no padrao brasileiro (DD/MM/AAAA HH:mm).
export function formatarDataAtual(dataObj = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  const dia = pad(dataObj.getDate());
  const mes = pad(dataObj.getMonth() + 1);
  const ano = dataObj.getFullYear();
  const hora = pad(dataObj.getHours());
  const minuto = pad(dataObj.getMinutes());
  return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
}

export default class Storage {
  // Escuta os calculos registrados no Firestore em tempo real.
  listarCalculos(aoAtualizar, aoErro) {
    return firebase
      .firestore()
      .collection(COLECAO_IMC)
      .orderBy('criadoEm', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const lista = [];
          querySnapshot.forEach((doc) => {
            const dados = doc.data();
            lista.push({
              id: doc.id,
              ...dados,
            });
          });
          aoAtualizar(lista);
        },
        (erro) => {
          if (aoErro) aoErro(erro);
        }
      );
  }

  // Salva o calculo do IMC e a data no Firestore.
  async adicionar({ valor, categoria, chaveCor, peso, altura }) {
    const agora = new Date();
    const registro = {
      imc: Number(valor.toFixed(1)),
      categoria,
      chaveCor,
      peso: Number(peso),
      altura: Number(altura),
      data: formatarDataAtual(agora),
      criadoEm: agora.getTime(),
    };

    const docRef = await firebase
      .firestore()
      .collection(COLECAO_IMC)
      .add(registro);
    return { id: docRef.id, ...registro };
  }

  // Apaga um calculo registrado no Firestore pelo ID.
  async apagar(id) {
    await firebase.firestore().collection(COLECAO_IMC).doc(id).delete();
  }
}
