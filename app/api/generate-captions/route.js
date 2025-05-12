import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { audioUrl } = await req.json();

        const client = new AssemblyAI({
            apiKey: process.env.ASSEMBLYAI_API_KEY,
        });

        const params = {
            audio: audioUrl,
            speech_model: "universal",
        };

        const transcript = await client.transcripts.transcribe(params);
        return NextResponse.json({
            result: "Transcription completed successfully",
            captions: transcript.words,
        });
    } catch (error) {
        console.error("Error during generating captions:", error);
        return NextResponse.json({
            message: "Error during generating captions",
            error: error.message,
        })

    }
}
