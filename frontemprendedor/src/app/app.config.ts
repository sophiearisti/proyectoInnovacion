import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCMQT3J9pKRVTjG68S9qdmDk4UbFMFLgcE",
  authDomain: "latindrip-d5c91.firebaseapp.com",
  projectId: "latindrip-d5c91",
  storageBucket: "latindrip-d5c91.appspot.com",
  messagingSenderId: "292861613688",
  appId: "1:292861613688:web:c6d7e853eef446fc0e7f8d",
  measurementId: "G-VSP3E5XNGQ"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)), // Inicializa Firebase aquí
    provideAuth(() => getAuth()), // Usar la instancia predeterminada
    provideFirestore(() => getFirestore()), // Usar la instancia predeterminada
    provideDatabase(() => getDatabase()), // Usar la instancia predeterminada
    provideStorage(() => getStorage()) // Usar la instancia predeterminada
  ]
};
