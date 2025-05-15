import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { getWebhooksUrls, ping, unRegisterWebhook } from './utils/webhookUtils.js';
import webhooksRouter from "./routers/webhookRouter.js";

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(express.json());

app.use(webhooksRouter);

// =======================================
// Enabling SWAGGER/OPENAPI DOCS
// =======================================
const swaggerDefinition = {
    openapi: '3.1.0',
    info: {
        title: 'Webhook API',
        version: '0.0.1'
    },
    apis: ['./src/routers/*Router.ts']
};

const swaggerOptions = {
    swaggerDefinition,
    apis: ['./src/routers/*Router.ts']
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));

// =======================================
// ENABLING THE INTERVAL FOR MOCK WEBHOOK
// =======================================
setInterval(() => {
    const urls = getWebhooksUrls();

    if (urls.length === 0) return;
    console.log("Sending to all registered webhooks.");
    urls.forEach(async (url) => {
        const couldPing = await ping(url);
        if (!couldPing) {
            unRegisterWebhook(url);
        }
    });

}, 30 * 1000); // 30 seconds


// =======================================
// STARTING THE WEBHOOK SERVER
// =======================================
app.listen(PORT, () => console.log("Server started listening on port", PORT));