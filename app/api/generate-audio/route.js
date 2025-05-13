import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import fs from 'fs';
import util from 'util'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/configs/FirebaseConfig";

const client = new textToSpeech.TextToSpeechClient({
    apiKey: process.env.GOOGLE_API_KEY
});
export async function POST(req) {
    try {

        const { text, id } = await req.json();
        const storageRef = ref(storage,'ai-shortslab/audio/'+id+'.mp3')
        const request = {
            input: { text: text },
            voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
            audioConfig: { audioEncoding: 'MP3' }
        }

        const [response] = await client.synthesizeSpeech(request);
        const audioBuffer = Buffer.from(response?.audioContent, 'binary')

        await uploadBytes(storageRef, audioBuffer, { contentType: 'audio/mp3' })

        const audioUrl = await getDownloadURL(storageRef)
        return NextResponse.json({
            result: 'Audio file generated successfully',
            audioUrl
        })

    } catch (err) {
        console.log('Error while generating audio', err);
        return NextResponse.json({
            message: 'Error while generating audio',
            error: err
        })
    }

}