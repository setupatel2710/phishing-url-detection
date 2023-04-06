import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from url_feature_extraction_final import *
from pydantic import BaseModel
#loading the model
from tensorflow import keras
model=keras.models.load_model('ANN_Model_Final.h5')

#init app
app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

class Url(BaseModel):
    url: str

# @app.get("/" )
# async def hell():
#     return {"hell": "go"}

@app.post("/url/")
async def index(u: Url):
    features = featureExtraction(u.url)
    pred = model.predict([features])
    r_pred = []
    for element in pred:
        print(element)
        if element >= 0.5:
            r_pred.append(1)
        else:
            r_pred.append(0)
    return {"pred": r_pred[0]}
    # return {"pred": features}

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)

