import * as dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const DEFAULT_TEXT = `Tired of scattered job applications and missed opportunities? Take control of your career journey with our intuitive job tracker! Effortlessly organize your applications, track your progress, and manage important deadlines. Visualize your success, identify areas for improvement, and watch your career prospects grow. Let us help you land your dream job, one organized step at a time. Start tracking smarter today!`; // Your default text

export const generateAIText = async (req, res) => {
    try {
        const model = new ChatGoogleGenerativeAI({
            model: "gemini-2.0-flash",
            apiKey: process.env.GEMINI_API_KEY,
        });

        const prompt = ChatPromptTemplate.fromMessages([
            ["system", "You are a helpful career advisor who specializes in job tracking and career growth."],
            ["human", `Generate a concise, engaging paragraph (50-70 words) for a job tracking application landing page. Emphasize the app’s benefits: it lets users post and manage job opportunities with Job Listing, track application status and tasks via the Job Progress Tracker, and conveniently oversee their career progress through a User Dashboard. Maintain a professional yet friendly tone and avoid markdown formatting.`],
        ]);

        const chain = prompt.pipe(model).pipe(new StringOutputParser());
        const response = await chain.invoke({});

        res.status(StatusCodes.OK).json({ text: response });
    } catch (error) {
        console.error('AI Error:', error);
        res.status(StatusCodes.OK).json({ text: DEFAULT_TEXT });
    }
};