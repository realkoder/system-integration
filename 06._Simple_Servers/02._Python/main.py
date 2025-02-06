from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"data": "Hello world"}

@app.get("/greeting")
def greeting():
    return {"data": "GREETING"}