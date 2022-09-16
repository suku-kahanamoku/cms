import admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json'

export const apiKey = 'AIzaSyBeofcuKAVLEIiuxcbMh-iywKf3PS7i3l8';

export const app = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as any),
});

export const db = app.firestore();
