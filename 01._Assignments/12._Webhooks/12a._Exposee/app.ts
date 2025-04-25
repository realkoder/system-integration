import express from 'express';
import fs from 'fs';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(express.json());

type TEventType = "PROGRAMMING" | "HORROR" | "AI";

function getHooksFilePath(eventType: TEventType) {
    switch (eventType) {
        case 'AI':
            return "./assets/ai_webhooks_urls.txt"
        case 'HORROR':
            return "./assets/horror_webhooks_urls.txt"
        case 'PROGRAMMING':
            return "./assets/programming_webhooks_urls.txt"
        default:
            return "./assets/random_webhooks_urls.txt"
    }
}

function registerNewWebhook(eventType: TEventType, webhookUrl: string) {
    console.log("ADDING url", webhookUrl);
    fs.appendFileSync(getHooksFilePath(eventType), webhookUrl + "\n");
};

function getWebhooksUrls(eventType: TEventType) {
    const hooksFilePath = getHooksFilePath(eventType);
    if (fs.existsSync(hooksFilePath)) {
        const data = fs.readFileSync(hooksFilePath, 'utf-8');
        return data.split("\n").filter(url => url.length > 0);
    } else {
        return [];
    }
};

// Ping endpoint to test registered webhooks
async function ping(url: string) {
    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: "Hello you have been webhooked" })
    });
}

app.post("/register", async (req, res) => {
    const { eventType, url }: { eventType: TEventType, url: string } = req.body;

    if (!eventType || !url || (eventType !== "AI" && eventType !== "HORROR" && eventType !== "PROGRAMMING")) {
        res.status(400).send({ error: "Event type {AI | HORROR | PROGRAMMING} and URL are required." });
        return;
    }

    try {
        await ping(url);
        registerNewWebhook(eventType, url);
        res.send({ message: `Webhook registered for event type: ${eventType}` });
    } catch (e) {
        console.error("Error pinging", e)
        res.send({ message: `Webhook could NOT BE registered for event type: ${eventType}` });
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

    const aiWebhooksUrls = getWebhooksUrls("AI");
    const horrorWebhooksUrls = getWebhooksUrls("HORROR");
    const programmingWebhooksUrls = getWebhooksUrls("PROGRAMMING");

    const urls = [...aiWebhooksUrls, ...horrorWebhooksUrls, ...programmingWebhooksUrls];

    if (urls.length === 0) return;
    console.log("Sending to all registered webhooks.");
    urls.forEach(url => {
        ping(url);
    })

}, 5 * 1000); // 5 seconds

app.listen(PORT, () => console.log("Server started listening on port", PORT));