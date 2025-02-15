from fastapi import FastAPI, File, UploadFile, HTTPException
import os
from src.fileParser import parse_file

app = FastAPI();

@app.get("/")
def root():
    return { "data": "Hello world" }    


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