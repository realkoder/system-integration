import express from 'express';
import fs from 'fs';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT ?? 8080;

const WEBHOOK_CALLBACK_URLS_FILE_PATH = "./assets/webhook-callback-urls.txt";

app.use(express.json());

app.get("/test", (req, res) => {
    res.send({ data: "Hello from server xD" });
});

interface IPaymentPayload {
    id: string;
    type: "SUCCEEDED" | "DENIED" | "PENDING" | "FAILED";
    created: Date;
    data: {
        id: string;
        subscription_id: string;
        created: Date;
        payment_method: "Paypal" | "MobilePay" | "ApplePay" | "CreditCard" | "BankTransfer";
    };
    request: {
        id: string;
        idempotency_key: string;
    };
}

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

function registerNewWebhook(webhookCallbackUrl: string) {
    console.log("ADDING webhookCallbackUrl", webhookCallbackUrl);
    fs.appendFileSync(WEBHOOK_CALLBACK_URLS_FILE_PATH, webhookCallbackUrl + "\n");
};

function getWebhooksUrls() {
    if (fs.existsSync(WEBHOOK_CALLBACK_URLS_FILE_PATH)) {
        const data = fs.readFileSync(WEBHOOK_CALLBACK_URLS_FILE_PATH, 'utf-8');
        return data.split("\n").filter(url => url.length > 0);
    } else {
        return [];
    }
};

// Ping endpoint to test registered webhooks
async function ping(url: string) {
    console.log(url)
    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getMockedPaymentPayload())
    });
}

app.post("/register", async (req, res) => {
    const { webhookCallbackUrl }: { webhookCallbackUrl: string } = req.body;

    if (!webhookCallbackUrl) {
        res.status(400).send({ error: "WebhookCallbackUrl are required." });
        return;
    }

    try {
        await ping(webhookCallbackUrl);
        registerNewWebhook(webhookCallbackUrl);
        res.send({ message: `Webhook registered for payment-webhook` });
    } catch (e) {
        console.error("Error pinging", e)
        res.send({ message: `Webhook could NOT BE registered for payment-webhook` });
    }
    return;
});

// // Unregister a webhook
// app.post("/unregister", (req, res) => {
//     const { eventType, url }: { eventType: TEventType, url: string } = req.body;

//     if (!eventType || !url) {
//         res.status(400).send({ error: "Event type and URL are required." });
//         return;
//     }

//     if (registeredWebhooks[eventType]) {
//         registeredWebhooks[eventType] = registeredWebhooks[eventType].filter(hook => hook !== url);
//         res.send({ message: `Webhook unregistered for event type: ${eventType}` });
//     } else {
//         res.status(404).send({ error: "Event type not found." });
//     }
// });

setInterval(() => {
    const urls = getWebhooksUrls();

    if (urls.length === 0) return;
    console.log("Sending to all registered webhooks.");
    urls.forEach(url => {
        ping(url);
    });

}, 5 * 1000); // 5 seconds

app.listen(PORT, () => console.log("Server started listening on port", PORT));