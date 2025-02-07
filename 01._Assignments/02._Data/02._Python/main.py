from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse

app = FastAPI();

@app.get("/")
def root():
    return { "data": "Hello world" }

@app.post('/upload/')
async def create_upload_file(file: UploadFile = File(...)):
    if file.filename.endswith(('.txt', '.yaml', '.xml', '.yml', '.json')):
        file_bytes = await file.read()
        return {
            "filename": file.filename,
            "bytes": str(file_bytes)[:30]
        }
    else:
        raise HTTPException(status_code=400, detail="Only .txt, .yaml, .yml, .xml, and .json files are allowed")