import express from "express";

const PORT = 8080;

const app = express();

app.get("/request-fastapi-data", async (req, res) => {
  try {
    const fastApiRes = await fetch("http://localhost:8000/fastapi-data");
    if (fastApiRes.ok) {
      const parsedDate = await fastApiRes.json();
      return res.send({ data: parsedDate });
    } else {
      res.send({ data: "Python req was not OK" });
    }
  } catch {
    console.log("RES WAS NOT OK");
    res.send({ data: "Python req did not get through" });
  }
});

app.get("/express-data", (req, res) => {
  res.send({ data: "Here is some data!" });
});

app.get("/names/:name", (req, res) => {
  const name = req.params.name;
  console.log(name);
  res.send({ data: `Hello ${name}` });
});

app.get("/animal/:name", (req, res) => {
  const name = req.params.name;
  console.log(name);
  res.send({
    data: {
      animal: {
        name,
        type: "MONKEY",
        profilePic: "🦧",
      },
    },
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
