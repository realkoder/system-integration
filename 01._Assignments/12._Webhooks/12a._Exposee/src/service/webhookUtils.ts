import fs from 'fs';
import fetch from 'node-fetch';
import { IPaymentPayload } from '../types.js';

class WebhookService {
    private WEBHOOK_CALLBACK_URLS_FILE_PATH = "./assets/webhook-callback-urls.txt";

    constructor() {
        // =======================================
        // ENABLING THE INTERVAL FOR MOCK WEBHOOK
        // =======================================
        console.log("WebhookService instantiated and will try reach out to webhooks every 30 second.");
        setInterval(() => {
            const urls = this.getWebhooksUrls();

            if (urls.length === 0) return;
            console.log("Sending to all registered webhooks.");
            urls.forEach(async (url) => {
                const couldPing = await this.ping(url);
                if (!couldPing) {
                    this.unRegisterWebhook(url);
                }
            });

        }, 30 * 1000); // 30 seconds
    }


    // Internal use - not exported
    getMockedPaymentPayload(): IPaymentPayload {
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

    registerNewWebhook(webhookCallbackUrl: string): boolean {
        console.log("ADDING webhookCallbackUrl", webhookCallbackUrl);
        const existingUrls = this.getWebhooksUrls();
        if (!existingUrls.includes(webhookCallbackUrl)) {
            fs.appendFileSync(this.WEBHOOK_CALLBACK_URLS_FILE_PATH, webhookCallbackUrl + "\n");
            return true;
        } else {
            console.log("Webhook URL already exists.");
            return false;
        }
    };

    unRegisterWebhook(webhookCallbackUrl: string) {
        console.log("Removing webhookCallbackUrl", webhookCallbackUrl);

        const existingUrls = this.getWebhooksUrls();

        const updatedUrls = existingUrls.filter(url => url.trim() !== webhookCallbackUrl);

        if (existingUrls.length === updatedUrls.length) {
            console.log("Webhook URL not found.");
            return;
        }

        if (updatedUrls.length === 0) {
            fs.writeFileSync(this.WEBHOOK_CALLBACK_URLS_FILE_PATH, "");
        } else {
            fs.writeFileSync(this.WEBHOOK_CALLBACK_URLS_FILE_PATH, updatedUrls.join('\n') + '\n');
        }
    };

    getWebhooksUrls() {
        if (fs.existsSync(this.WEBHOOK_CALLBACK_URLS_FILE_PATH)) {
            const data = fs.readFileSync(this.WEBHOOK_CALLBACK_URLS_FILE_PATH, 'utf-8');
            return data.split("\n").filter(url => url.length > 0);
        } else {
            return [];
        }
    };

    async ping(url: string) {
        console.log(url)
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.getMockedPaymentPayload())
            });
            return res.ok ? true : false;
        } catch {
            return false;
        }
    }
}

export default WebhookService;