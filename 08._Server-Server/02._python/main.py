from fastapi import FastAPI
import httpx


app = FastAPI()

@app.get("/fastapi-data")
def getFastApiData():
    return { "data": "🍔🍟🍔 FASTAPI DATA 🍔🍟🍔" }


@app.get("/request-nodejs")
async def requestNodejs():
    async with httpx.AsyncClient() as client:
                response = await client.get("http://localhost:8080/express-data")
                
                return {"data": response.json()}