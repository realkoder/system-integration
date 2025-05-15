import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
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
    apis: process.env.ENV === "dev" ? ['./src/routers/*Router.ts'] : ['./dist/routers/*Router.js']
};

const swaggerOptions = {
    swaggerDefinition,
    apis: process.env.ENV === "dev" ? ['./src/routers/*Router.ts'] : ['./dist/routers/*Router.js']
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));

// =======================================
// STARTING THE WEBHOOK SERVER
// =======================================
app.listen(PORT, () => console.log("Server started listening on port", PORT));