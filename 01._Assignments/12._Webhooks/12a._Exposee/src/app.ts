import express from 'express';
import fs from 'fs';
import fetch from 'node-fetch';
import { IPaymentPayload } from './types';

const app = express();
const PORT = process.env.PORT ?? 8080;

const WEBHOOK_CALLBACK_URLS_FILE_PATH = "./assets/webhook-callback-urls.txt";

app.use(express.json());

// ================================
// TESTING SERVER IS ACCESSIBLE
// ================================
app.get("/test", (req, res) => {
    res.send({ data: "Hello from server xD" });
});

// ================================
//          UTIL METHODS
// ================================
function getMockedPaymentPayload(): IPaymentPayload {
    const paymentMethods: ["Paypal", "MobilePay", "ApplePay", "CreditCard", "BankTransfer"] = ["Paypal", "MobilePay", "ApplePay", "CreditCard", "BankTransfer"];
    const statuses: ["SUCCEEDED", "DENIED", "PENDING", "FAILED"] = ["SUCCEEDED", "DENIED", "PENDING", "FAILED"];

    return {
        id: Math.random().toString(36).substring(2, 15),
        type: statuses[Math.floor(Math.random() * statuses.length)],
        created: new Date(),
        data: {
            id: Math.random().toString(36).substring(2, 15),
            subscription_id: Math.random().toString(36).substring(2, 15),
            created: new Date(),
            payment_method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        },
        request: {
            id: Math.random().toString(36).substring(2, 15),
            idempotency_key: Math.random().toString(36).substring(2, 15),
        },
    };
}

function registerNewWebhook(webhookCallbackUrl: string): boolean {
    console.log("ADDING webhookCallbackUrl", webhookCallbackUrl);
    const existingUrls = getWebhooksUrls();
    if (!existingUrls.includes(webhookCallbackUrl)) {
        fs.appendFileSync(WEBHOOK_CALLBACK_URLS_FILE_PATH, webhookCallbackUrl + "\n");
        return true;
    } else {
        console.log("Webhook URL already exists.");
        return false;
    }
};

function unRegisterWebhook(webhookCallbackUrl: string) {
    console.log("Removing webhookCallbackUrl", webhookCallbackUrl);

    const existingUrls = getWebhooksUrls();

    const updatedUrls = existingUrls.filter(url => url.trim() !== webhookCallbackUrl);

    if (existingUrls.length === updatedUrls.length) {
        console.log("Webhook URL not found.");
        return;
    }

    if (updatedUrls.length === 0) {
        fs.writeFileSync(WEBHOOK_CALLBACK_URLS_FILE_PATH, "");
    } else {
        fs.writeFileSync(WEBHOOK_CALLBACK_URLS_FILE_PATH, updatedUrls.join('\n') + '\n');
    }
};

function getWebhooksUrls() {
    if (fs.existsSync(WEBHOOK_CALLBACK_URLS_FILE_PATH)) {
        const data = fs.readFileSync(WEBHOOK_CALLBACK_URLS_FILE_PATH, 'utf-8');
        return data.split("\n").filter(url => url.length > 0);
    } else {
        return [];
    }
};

async function ping(url: string) {
    console.log(url)
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getMockedPaymentPayload())
        });
        return res.ok ? true : false;
    } catch {
        return false;
    }
}

// ===================================
// ENDPOINT FOR REGISTING AN ENDPOINT
// ===================================
app.post("/register", async (req, res) => {
    const { webhookCallbackUrl }: { webhookCallbackUrl: string } = req.body;

    if (!webhookCallbackUrl) {
        res.status(400).send({ error: "WebhookCallbackUrl are required." });
        return;
    }

    if (webhookCallbackUrl.includes("\n") || webhookCallbackUrl.length > 1000 || webhookCallbackUrl.length < 4) {
        res.status(400).send({ error: "WebhookCallbackUrl has to be a valid URL." });
        return;
    }

    try {
        const couldPing = await ping(webhookCallbackUrl);
        const isUrlRegistered = registerNewWebhook(webhookCallbackUrl);
        if (couldPing && isUrlRegistered) {
            res.send({ message: `Webhook registered for payment-webhook` });
        } else {
            res.status(400).send({ error: "WebhookCallbackUrl is already registered." });
        }
    } catch (e) {
        console.error("Error pinging", e)
        res.send({ message: `Webhook could NOT BE registered for payment-webhook` });
    }
    return;
});

app.get("/ping", (req, res) => {
    const urls = getWebhooksUrls();

    if (urls.length === 0) {
        res.status(200).send({ data: "No webhooks to ping" });
        return;
    }
    console.log("Sending to all registered webhooks.");
    urls.forEach(async (url) => {
        const couldPing = await ping(url);
        if (!couldPing) {
            unRegisterWebhook(url);
        }
    });
    res.status(200).send({ data: "Pinged all webhooks" });
    return;
});

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