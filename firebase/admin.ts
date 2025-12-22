import { getAuth } from 'firebase-admin/auth';
import {getApps, initializeApp, cert} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const initFirebaseAdmin = () => {
    const apps = getApps();
   
    if (!apps.length) {
        const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

        if (!projectId || !clientEmail || !privateKey) {
            console.error("Firebase Admin SDK initialization failed: Missing environment variables.");
            throw new Error("Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY");
        }

        // The error "Service account object must contain a string 'project_id' property"
        // often occurs if any of the keys are missing or if the SDK version expects snake_case.
        const serviceAccount = {
            projectId,
            clientEmail,
            privateKey,
            // Explicitly providing snake_case keys for compatibility
            project_id: projectId,
            client_email: clientEmail,
            private_key: privateKey,
        };

        initializeApp({ 
            credential: cert(serviceAccount as any),
        });
    }

    return {
        auth : getAuth(),
        db: getFirestore(),
    }
};

export const {auth, db} = initFirebaseAdmin();