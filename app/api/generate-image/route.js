import Replicate from "replicate";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";

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
        for (const [index, item] of Object.entries(output)) {
            await writeFile(`output_${index}.png`, item);
        }
        return NextResponse.json({
            message: 'Image generated successfully',
            result: output[0]
        })

    } catch (err) {
        console.log('Error while generating image', err);
        return NextResponse.json({
            message: 'Error while generating image',
            error: err.message
        })
    }
}