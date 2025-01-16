const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Write a script to generate a 30 sec video on topic : Interesting story about indian sculptures\nwith AI image prompt in realistic format for each scene and give me result in json format with imageFormat and contentText as field" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"video_script\": [\n    {\n      \"scene\": 1,\n      \"duration\": 3,\n      \"ai_image_prompt\": \"A wide shot of the Kailasa Temple at Ellora, carved out of a single rock, bathed in golden sunlight during early morning. Realistic, detailed texture, high resolution.\",\n       \"imageFormat\" : \"landscape\",\n      \"contentText\": \"Narrator: Imagine a world where mountains became canvases, where stories were etched in stone. India's ancient sculptures are not just art, they are echoes of a vibrant past.\"\n    },\n     {\n      \"scene\": 2,\n      \"duration\": 5,\n      \"ai_image_prompt\": \"Close-up, detailed shot of the intricate carvings on the Khajuraho temple walls, focusing on the depiction of a celestial apsara. Realistic, warm lighting, high definition.\",\n      \"imageFormat\" : \"portrait\",\n      \"contentText\": \"Narrator: From the sensuous curves of Khajuraho's apsaras to the divine grace of temple deities...\"\n    },\n     {\n      \"scene\": 3,\n      \"duration\": 5,\n      \"ai_image_prompt\": \"A medium shot of a massive Ganesha idol, sculpted from black stone, adorned with flowers and sacred threads. Realistic textures of stone and cloth, shallow depth of field.\",\n       \"imageFormat\" : \"portrait\",\n      \"contentText\": \"Narrator: ...each sculpture carries a tale, a myth, a belief.\"\n    },\n     {\n      \"scene\": 4,\n      \"duration\": 5,\n     \"ai_image_prompt\": \"A low angle shot of the colossal statue of Gommateshwara in Shravanabelagola, with clear blue sky in the background. Realistic portrayal of the weathered stone, sharp details.\",\n     \"imageFormat\" : \"landscape\",\n      \"contentText\": \"Narrator: Consider Gommateshwara, a monolithic statue standing tall for centuries, a testament to human perseverance.\"\n    },\n    {\n      \"scene\": 5,\n      \"duration\": 7,\n        \"ai_image_prompt\":\"A montage of various Indian sculptures: bronze Nataraja, Chola bronze, Sarnath Buddha, a stone carving of a Hindu deity, moving quickly between each with smooth transition. Realistic textures, natural lighting\",\n      \"imageFormat\" : \"landscape\",\n      \"contentText\": \"Narrator: These sculptures are not just static figures; they dance, they speak, they breathe life into the stories of the ages. They represent not just artistry but also spirituality, philosophy, and cultural richness. \"\n    },\n     {\n       \"scene\": 6,\n       \"duration\": 5,\n       \"ai_image_prompt\": \"A close up shot of hands gently touching a weathered stone sculpture, with soft light. Realistic, shallow depth of field, emphasize texture.\",\n       \"imageFormat\" : \"portrait\",\n       \"contentText\": \"Narrator: Come, explore the silent storytellers of India, and let their wisdom resonate with you.\"\n     }\n  ]\n}\n```\n" },
            ],
        },
    ],
});
