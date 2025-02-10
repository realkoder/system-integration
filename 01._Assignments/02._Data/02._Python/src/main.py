import json
from fastapi import FastAPI, File, UploadFile, HTTPException
import httpx

app = FastAPI();

@app.get("/")
def root():
    return { "data": "Hello world" }

@app.post('/parse-file-nodejs-server')
async def parse_file_nodejs_server(file: UploadFile = File(...)):
    try:
        if file.filename.endswith(('.txt', '.yaml', '.xml', '.yml', '.json')):
            async with httpx.AsyncClient() as client:
                response = await client.post("http://node-api-file-upload:8080/api/v1/uploads",
                                             files={"file": (file.filename, file.file, file.content_type)})
                return {"data": response.json()}

        else:
            raise HTTPException(status_code=400, detail="Only .txt, .yaml, .yml, .xml, and .json files are allowed")
        
    except httpx.exceptions.RequestError as e:
        return {"error": str(e)}
    except httpx.exceptions.HTTPError as e:
        return {"error": f"HTTP error: {e}"}
    except json.JSONDecodeError as e:
        return {"error": f"Failed to parse JSON response: {e}"}
    except Exception as e:
        return {"error": f"An unexpected error occurred: {e}"}
    


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