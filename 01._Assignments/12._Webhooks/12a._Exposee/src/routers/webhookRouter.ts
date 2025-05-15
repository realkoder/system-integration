import { Router } from 'express';
import { getWebhooksUrls, ping, registerNewWebhook, unRegisterWebhook } from '../utils/webhookUtils.js'

const router = Router();

// ================================
// TESTING SERVER IS ACCESSIBLE
// ================================
/**
 * @swagger
 * /test:
 *   get:
 *     summary: Returns a greeting message
 *     description: This endpoint returns a simple greeting message from the server.
 *     responses:
 *       200:
 *         description: A successful response with a greeting message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "Hello from server xD"
 */
router.get("/test", (req, res) => {
    res.send({ data: "Hello from server xD" });
});


// ===================================
// ENDPOINT FOR REGISTING AN ENDPOINT
// ===================================
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registers a new webhook
 *     description: This endpoint registers a new webhook with the provided callback URL.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               webhookCallbackUrl:
 *                 type: string
 *                 description: The URL to which the webhook will send notifications.
 *                 example: "https://example.com/webhook"
 *     responses:
 *       200:
 *         description: Webhook successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Webhook registered for payment-webhook"
 *       400:
 *         description: Bad request due to invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "WebhookCallbackUrl has to be a valid URL."
 */
router.post("/register", async (req, res) => {
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

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Pings all registered webhooks
 *     description: This endpoint pings all registered webhooks and unregisters any that do not respond.
 *     responses:
 *       200:
 *         description: Successfully pinged all webhooks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "Pinged all webhooks"
 *       204:
 *         description: No webhooks to ping
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "No webhooks to ping"
 */
router.get("/ping", (req, res) => {
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

export default router;