import { auth, db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export function GET() {
    return Response.json({
        success: true,
        message: "Vapi SDK initialized successfully"
    })
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { role, level, techstack, userid } = body;

        // Basic check to verify the userid against Firebase Admin
        if (!userid) {
            return Response.json({
                success: false,
                message: "Missing userid in request body"
            }, { status: 400 });
        }

        try {
            await auth.getUser(userid);
        } catch (authError) {
            console.error("Firebase Admin Auth Error:", authError);
            return Response.json({
                success: false,
                message: "Invalid or unauthorized userid"
            }, { status: 401 });
        }

        const { text: questions } = await generateText({
            model: google("gemini-2.5-flash-lite"),
            prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        Focus on both technical and behavioural questions.
        The amount of questions required is: 5.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `
        });

        const interview = {
            role: role,
            type: "Mixed",
            level: level,
            techstack: techstack.split(",").map((s: string) => s.trim()),
            questions: JSON.parse(questions),
            userId: userid,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        }

        await db.collection('interviews').add(interview);

        // Ensuring the response is formatted correctly for Vapi (using a result key)
        return Response.json({
            result: {
                success: true,
                message: "Interview generated successfully",
                interview
            }
        }, { status: 200 })

    } catch (err: unknown) {
        console.error("API Error:", err);

        const error = err as { statusCode?: number; message?: string };

        if (error.statusCode === 429) {
            return Response.json({
                success: false,
                message: "Gemini API rate limit exceeded. Please wait a few moments and try again."
            }, { status: 429 });
        }

        return Response.json({
            success: false,
            message: error.message || "Internal Server Error"
        }, { status: 500 })
    }
}
