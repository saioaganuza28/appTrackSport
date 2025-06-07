
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDObon-oxdEQgmUwPA_74X76xgu8HH416I",
  authDomain: "tracksport-9e41e.firebaseapp.com",
  databaseURL: "https://tracksport-9e41e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tracksport-9e41e",
  storageBucket: "tracksport-9e41e.firebasestorage.app",
  messagingSenderId: "864757496199",
  appId: "1:864757496199:web:481f5c1f985991b7647b22",
  measurementId: "G-G3Z4SWRXSD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
