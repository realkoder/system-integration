import express from "express";

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("THE WEBHOOK RECEIVED DATA", req.body);
  res.status(200).send({ data: "OK" });
});

app.get("/register-webhook", (req, res) => {
  const url = "https://webhoob20250501214221-cad2cdb4hncsg6bu.northeurope-01.azurewebsites.net/api/webhooks";
  const payload = {
      callbackUrl: "https://integrator.loca.lt/webhook",
      eventTypes: ["PaymentInitiated", "PaymentCompleted"]
  };
  fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      console.log("Success:", data);
  })
  .catch(error => {
      console.error("Error:", error);
  });
})

app.listen(PORT, console.log("Server is running at PORT", PORT));
