from fastapi import FastAPI, UploadFile, File
from PIL import Image
import torch
import io

app = FastAPI()

# Load trained model here
model = None  

def predict(image):
    # Replace with trained model inference
    return {
        "disease": "Leaf Blight",
        "confidence": 0.91
    }

@app.post("/predict")
async def predict_api(file: UploadFile = File(...)):
    img_bytes = await file.read()
    image = Image.open(io.BytesIO(img_bytes))

    result = predict(image)
    return result
