import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Stripe from "stripe";
import "dotenv/config";

// IMPORT STRIPE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// CREATE EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));

/**
 * ROUTES
 */

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("We are about to build the illest Stripe Payment API...");
});

app.post("/api/checkout", async (req, res) => {
  // RECEIVE PRODUCT AND CARD DETAILS FROM CLIE
  const { product /*card*/ } = req.body;
  try {
    // const card = await stripe.customers.createSource(req.body.customer_id, {
    //   source: "tok_mastercard",
    // });
    // CREATE STRIPE PAYMENT TOKEN
    // const stripeToken = await stripe.tokens.create({
    //   card,
    // });

    // CREATE STRIPE CUSTOMER
    // const stripeCustomer = await stripe.customers.create({
    //   email: "test@nishimwe.dev",
    //   source: stripeToken.id,
    //   address: {
    //     line1: "KK 137 ST",
    //     postal_code: "10001",
    //     city: "Kigali",
    //   },
    //   shipping: {
    //     name: "Nishimwe",
    //     address: {
    //       line1: "KK 137 ST",
    //       postal_code: "10001",
    //       city: "Kigali",
    //     },
    //   },
    //   name: "NISHIMWE",
    // });

    // CREATE STRIPE CHARGE
    const stripeCharge = await stripe.charges.create({
      amount: product.price * 100, // To convert to cents
      currency: "usd",
      //   customer: stripeCustomer.id,
      source: "tok_visa",
      description: `Purchased the ${product.name} for ${product.price}`,
    });

    // SEND RESPONSE
    res.status(200).json({
      message: "Payment was successful",
      charge: stripeCharge,
    });
  } catch (error) {
    // CATCH ERRORS
    return res.status(500).json({
      error: error.message,
    });
  }
});

// CREATE SERVER
const PORT = Number(process.env.PORT ?? 5000);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
