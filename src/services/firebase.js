import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

// Configuracao do projeto Firebase do grupo (imc-joao-15467).
// A chave web do Firebase e publica por natureza. Quem controla o acesso
// sao as regras em firestore.rules.
const firebaseConfig = {
  apiKey: 'AIzaSyCHgJ7NCk_Dly0CqqonnG1KNLrfvXihYYc',
  authDomain: 'imc-joao-15467.firebaseapp.com',
  projectId: 'imc-joao-15467',
  storageBucket: 'imc-joao-15467.firebasestorage.app',
  messagingSenderId: '335979284506',
  appId: '1:335979284506:web:c3535a7c253a284bc429a3',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);

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

// Salva o calculo de IMC e a data do registro no Firestore.
export async function salvarCalculoImc({ valor, categoria, chaveCor, peso, altura }) {
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

  const docRef = await addDoc(collection(db, COLECAO_IMC), registro);
  return { id: docRef.id, ...registro };
}

// Escuta mudancas na colecao de calculos em tempo real, do mais recente ao mais antigo.
export function observarHistoricoImc(aoReceber, aoErro) {
  const consulta = query(collection(db, COLECAO_IMC), orderBy('criadoEm', 'desc'));
  return onSnapshot(
    consulta,
    (snapshot) => {
      const lista = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      aoReceber(lista);
    },
    (erro) => {
      if (aoErro) aoErro(erro);
    }
  );
}

// Apaga um calculo especifico pelo identificador do documento no Firestore.
export async function excluirCalculoImc(id) {
  await deleteDoc(doc(db, COLECAO_IMC, id));
}
