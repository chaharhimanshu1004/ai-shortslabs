import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const { prompt } = await req.json();
        console.log('>>>>prompt', prompt);

        const result = await chatSession.sendMessage(prompt);
        console.log('>>>>response from getting video script',result);

        const responseText = await result.response.text();
        console.log('>>>>responseText',responseText);

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