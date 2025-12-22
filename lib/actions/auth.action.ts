'use server';

import { auth, db } from "@/firebase/admin";

import { cookies } from "next/headers";


const ONE_WEEK = 60 * 60 * 24 * 7 * 1000;


export async function signUp(params:SignUpParams) {
    const {uid, email, name} = params;
    try {
        const userRecord = await db.collection('users').doc(uid).get();
        if(userRecord.exists) {
            return {
                success: false,
                error: "User already exists",
            }
        }
        await db.collection('users').doc(uid).set({
            email,
            name,
        });
        return {
            success: true,
            message: "User created successfully",
            error: null,
        }
    } catch (error: any) {
            console.log(`Error in signUp: ${error}`);
            if(error.code === "auth/email-already-exists") {
                return {
                    success: false,
                    error: "Email already exists",
                }
            }
            return {
                success: false,
                error: "Something went wrong",
            }
    }
}


export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK,
    });
    cookieStore.set("session", sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
    });
}


export async function signIn(params:SignInParams) {
    const {email, idToken} = params;
    try {
        const userRecord = await auth.getUserByEmail(email);
        if(!userRecord) {
            return {
                success: false,
                error: "User not found",
            }
        }
        await setSessionCookie(idToken); 
        return {
            success: true,
            error: null,
        }
    } catch (error) {
        console.log(`Error in signIn: ${error}`);
        return {
            success: false,
            error: "Something went wrong",
        }
    }
}


export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) {
    console.log("No session cookie found");
    return null;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    console.log("Decoded claims:", decodedClaims.uid);

    // get user info from db
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    
    if (!userRecord.exists) {
      console.log("User record not found for UID:", decodedClaims.uid);
      return null;
    }

    console.log("User found:", userRecord.id);
    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log("Error in getCurrentUser:", error);

    // Invalid or expired session
    return null;
  }
}

// Check if user is authenticated
export async function checkAuthStatus() {
  const user = await getCurrentUser();
  return !!user;
}

export async function signOut() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}