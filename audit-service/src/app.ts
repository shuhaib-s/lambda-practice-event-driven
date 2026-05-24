import express from "express";
import dotenv from "dotenv";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const app = express();
dotenv.config()

const REGION = process.env.REGION;

app.use(express.json());

const client = new DynamoDBClient({
    region: REGION
});

const dynamo = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME!;

app.post("/audit", async (req, res) => {
    try {

        const { email, path, createdAt } = req.body;

        console.log(req.body);

        await dynamo.send(
            new PutCommand({
                TableName: TABLE_NAME,
                Item: {
                    id: crypto.randomUUID(),
                    email,
                    path,
                    createdAt
                }
            })
        );

        res.status(200).json({
            message: "audit stored"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "internal server error"
        });
    }
});

export default app;