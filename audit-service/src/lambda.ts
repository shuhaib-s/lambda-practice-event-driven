import serverless from "serverless-http";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import {
    DynamoDBDocumentClient,
    PutCommand
} from "@aws-sdk/lib-dynamodb";

const expressHandler = serverless(app);

const client = new DynamoDBClient({
    region: process.env.REGION
});

const dynamo = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME!;

export const handler = async (event:any, context:any) => {

    try {

        // SQS Trigger
        if (
            event.Records &&
            event.Records[0]?.eventSource === "aws:sqs"
        ) {

            for (const record of event.Records) {

                const body = JSON.parse(record.body);

                console.log("SQS EVENT:", body);

                await dynamo.send(
                    new PutCommand({
                        TableName: TABLE_NAME,
                        Item: {
                            id: crypto.randomUUID(),
                            ...body
                        }
                    })
                );
            }

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "sqs processed"
                })
            };
        }

        // API Gateway Trigger
        return expressHandler(event, context);

    } catch (err) {

        console.error(err);

        throw err;
    }
};