import { db } from "@/firebase/admin";
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
    const { type, role, level, techstack, amount, userid } = await request.json();
    try {
        const { text: questions } = await generateText({
            model: google("gemini-2.5-flash-lite"),
            prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `
        });
        const interview = {
            role: role,
            type: type,
            level: level,
            techstack: techstack.split(","),
            questions: JSON.parse(questions),
            userId: userid,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        }

        await db.collection('interviews').add(interview);
        return Response.json({
            success: true,
            message: "Interview generated successfully",
            interview
        }, { status: 200 })
    } catch (err: unknown) {
        console.error("Gemini API Error:", err);

        const error = err as { statusCode?: number; message?: string };

        // Handle specifically for rate limit / quota
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