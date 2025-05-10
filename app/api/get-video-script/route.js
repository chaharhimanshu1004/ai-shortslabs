import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const { prompt } = await req.json();

        const result = await chatSession.sendMessage(prompt);

        const responseText = await result.response.text();

        return NextResponse.json({
            result:JSON.parse(responseText)
        })


    }catch(err){
        console.log('Error while generating video script', err);
        return NextResponse.json({
            message: 'Error while generating video script',
            error: err
        })
    }

}