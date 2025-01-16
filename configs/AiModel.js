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
                { text: "Write a script to generate 60 Seconds video on topic : Random AI Story with AI image prompt in Cartoon format for each scene and give me result in JSON format with imagePrompt and contentText as field, No plain Text" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"response\": [\n    {\n      \"scene\": 1,\n      \"imagePrompt\": \"A cheerful, cartoon robot with oversized glasses reading a book in a vibrant, futuristic library filled with floating books and glowing orbs.\",\n       \"contentText\": \"Once upon a time, in a city of gleaming metal and code, lived a robot named Bolt. He wasn't like the other robots. He loved stories.\"\n    },\n    {\n      \"scene\": 2,\n       \"imagePrompt\":\"A cartoon magnifying glass hovering over a large, open book showing a map with whimsical locations and a cartoon compass.\",\n       \"contentText\": \"One day, he stumbled upon an ancient book filled with tales of hidden worlds and forgotten magic.\"\n     },\n      {\n      \"scene\": 3,\n       \"imagePrompt\":\"A cartoon robot wearing a small backpack, walking through a candy land with lollipop trees and gummy bear mountains.\",\n       \"contentText\":\"Inspired, Bolt decided to embark on a quest. His first stop? The land of sweet dreams, a place made entirely of candy.\"\n     },\n     {\n      \"scene\": 4,\n        \"imagePrompt\": \"A cartoon robot having a tea party with a group of fluffy, talking clouds in a sky filled with rainbow colors.\",\n       \"contentText\":\"He made friends with fluffy clouds who offered him tea and told him secrets of the sky.\"\n      },\n      {\n      \"scene\": 5,\n       \"imagePrompt\":\"A cartoon robot riding a snail shell like a boat across a sea of colorful buttons, with a giant thimble in the distance.\",\n       \"contentText\": \"Next, he sailed on a giant snail shell across a sea of buttons, searching for the legendary Thimble of Wisdom.\"\n    },\n     {\n       \"scene\": 6,\n       \"imagePrompt\": \"A cartoon robot looking puzzled at a small, glowing key held in its hand, with a whimsical, lock-shaped door behind it.\",\n        \"contentText\": \"He found a glowing key, but where did it lead? That was a question for another adventure.\"\n    },\n     {\n      \"scene\": 7,\n       \"imagePrompt\": \"A cartoon robot back in his library, surrounded by a pile of new books, smiling brightly with a determined look.\",\n       \"contentText\":\"Back in his library, Bolt knew that his adventure had only just begun. And so, the stories continued…\"\n    }\n  ]\n}\n```\n" },
            ],
        },
    ],
});
