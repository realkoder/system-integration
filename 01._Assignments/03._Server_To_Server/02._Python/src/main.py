import json
from fastapi import FastAPI, File, UploadFile, HTTPException
import os

import httpx
from src.fileParser import parse_file

app = FastAPI();

@app.get("/")
def root():
    return { "data": "Hello world" }    

# Accepts a file and transform the data to JSON which is returned
@app.post('/upload/')
async def create_upload_file(file: UploadFile = File(...)):
    if file.filename.endswith(('.txt', '.yaml', '.xml', '.yml', '.json')):
        uploads_dir = 'uploads'
        if not os.path.exists(uploads_dir):
            os.makedirs(uploads_dir)

        file_path = os.path.join(uploads_dir, file.filename)
        with open(file_path, 'wb') as f:
            file_bytes = await file.read()
            f.write(file_bytes)
        file_object = await parse_file("uploads/" + file.filename)
        
        os.remove(file_path)
        
        return { "fileObject": file_object }
    else:
        raise HTTPException(status_code=400, detail="Only .txt, .yaml, .yml, .xml, and .json files are allowed")

# Accepts one file, sends the file to nodejs server which will transform the file to JSON which is returned.
@app.post('/parse-file-nodejs-server')
async def parse_file_nodejs_server(file: UploadFile = File(...)):
    try:
        if file.filename.endswith(('.txt', '.yaml', '.xml', '.yml', '.json')):
            async with httpx.AsyncClient() as client:
                response = await client.post("http://node-api-file-upload:8080/api/v1/uploads",
                                             files={"file": (file.filename, file.file, file.content_type)})
                return { "data": response.json() }

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