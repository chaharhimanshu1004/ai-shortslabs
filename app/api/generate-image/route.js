import Replicate from "replicate";
import { NextResponse } from "next/server";
import { writeFile, readFile, unlink } from "fs/promises";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/configs/FirebaseConfig";

export async function POST(req) {
    try {

        const { prompt } = await req.json();
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        const input = {
            prompt,
            height: 1280,
            width: 1024,
            num_outputs: 1,
        };

        const output = await replicate.run("bytedance/sdxl-lightning-4step:6f7a773af6fc3e8de9d5a3c00be77c17308914bf67772726aff83496ba1e3bbe", { input });
        let imageUrl = '';
        for (const [index, item] of Object.entries(output)) {
            const uid = Date.now();
            const localFilename = `output_${uid}.png`;
            await writeFile(localFilename, item);
            const imageBuffer = await readFile(localFilename);
            const storageRef = ref(storage, 'ai-shortslab/images/' + uid + '.png');
            await uploadBytes(storageRef, imageBuffer, { contentType: 'image/png' });
            imageUrl = await getDownloadURL(storageRef);
            await unlink(localFilename);
        }
        return NextResponse.json({
            message: 'Image generated successfully',
            result: imageUrl
        })

    } catch (err) {
        console.log('Error while generating image', err);
        return NextResponse.json({
            message: 'Error while generating image',
            error: err.message
        })
    }
}