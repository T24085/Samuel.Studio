import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim() || 'AIzaSyD2SlIzE8y_b7FgCm1GGt98x1IQ155ZOUE',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim() || 'samuel-studio.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim() || 'samuel-studio',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.trim() || 'samuel-studio.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim() || '981248818505',
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim() || '1:981248818505:web:25447bdca40aa99881ee98',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID?.trim() || 'G-NXY37YS8DS',
}

const app = initializeApp(firebaseConfig)

let analytics = null

try {
  analytics = getAnalytics(app)
} catch {
  analytics = null
}

export { app, analytics, firebaseConfig }
