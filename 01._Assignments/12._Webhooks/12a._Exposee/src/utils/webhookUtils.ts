import fs from 'fs';
import fetch from 'node-fetch';
import { IPaymentPayload } from '../types.js';

// ================================
//          UTIL METHODS
// ================================
const WEBHOOK_CALLBACK_URLS_FILE_PATH = "./assets/webhook-callback-urls.txt";

// Internal use - not exported
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

export function registerNewWebhook(webhookCallbackUrl: string): boolean {
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

export function unRegisterWebhook(webhookCallbackUrl: string) {
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

export function getWebhooksUrls() {
    if (fs.existsSync(WEBHOOK_CALLBACK_URLS_FILE_PATH)) {
        const data = fs.readFileSync(WEBHOOK_CALLBACK_URLS_FILE_PATH, 'utf-8');
        return data.split("\n").filter(url => url.length > 0);
    } else {
        return [];
    }
};

export async function ping(url: string) {
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