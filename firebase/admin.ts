
import { getAuth } from 'firebase-admin/auth';
import {getApps, initializeApp, cert} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
// import serviceAccount from '../serviceAccountKey.json';

const initFirebaseAdmin = () => {
    const apps = getApps();
   
    if (!apps.length) {
        initializeApp({ 
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        });
    }

    return {
        auth : getAuth(),
        db: getFirestore(),
    }
  
};

export const {auth, db} = initFirebaseAdmin();