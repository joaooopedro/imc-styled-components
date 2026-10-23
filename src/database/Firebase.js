import firebase from 'firebase';

// Configuracao do projeto Firebase (imc-joao-15467).
const firebaseConfig = {
  apiKey: 'AIzaSyCHgJ7NCk_Dly0CqqonnG1KNLrfvXihYYc',
  authDomain: 'imc-joao-15467.firebaseapp.com',
  projectId: 'imc-joao-15467',
  storageBucket: 'imc-joao-15467.firebasestorage.app',
  messagingSenderId: '335979284506',
  appId: '1:335979284506:web:c3535a7c253a284bc429a3',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
