import express from "express";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import dotenv from "dotenv"

const app = express();
dotenv.config()
const REGION = process.env.REGION;
app.use(express.json());

const sqs = new SQSClient({
    region: REGION
});

const QUEUE_URL = process.env.SQS_QUEUE_URL!;

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("login request", req.body);

        // Normally validate user here

        await sqs.send(
            new SendMessageCommand({
                QueueUrl: QUEUE_URL,
                MessageBody: JSON.stringify({
                    email,
                    path: "/login",
                    createdAt: new Date().toISOString()
                })
            })
        );

        res.status(200).json({
            message: "successfully logined"
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "internal server error"
        });
    }
});

export default app;