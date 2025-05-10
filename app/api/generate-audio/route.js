import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import fs from 'fs';
import util from 'util'

const client = new textToSpeech.TextToSpeechClient({
    apiKey: process.env.GOOGLE_API_KEY
});
export async function POST(req) {
    try {

        const { text, id } = await req.json();
        const request = {
            input: { text: text },
            voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
            audioConfig: { audioEncoding: 'MP3' }
        }

        const [response] = await client.synthesizeSpeech(request);
        const writeFile = util.promisify(fs.writeFile);
        await writeFile('output.mp3', response.audioContent, 'binary');
        console.log("Audio content written to file: output.mp3");

        return NextResponse.json({
            result: 'Audio file generated successfully'
        })

    } catch (err) {
        console.log('Error while generating audio', err);
        return NextResponse.json({
            message: 'Error while generating audio',
            error: err
        })
    }

}