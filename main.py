from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import edge_tts
import asyncio
import uuid
import os

app = Flask(__name__)
CORS(app)

# ---- 🧠 GLOBAL VOICE LIST INITIALIZATION ----
ENGLISH_VOICES = []

def load_voices():
    global ENGLISH_VOICES
    voices = asyncio.run(edge_tts.list_voices())
    ENGLISH_VOICES = [
        v for v in voices if v["Locale"] in ("en-US", "en-GB", "en-AU")
    ]

# Load voices on server startup
load_voices()

@app.route("/")
def home():
    return "Flask server is running!"

@app.route("/tts")
def tts():
    text = request.args.get("text", "")
    voice = request.args.get("voice", "en-US-AriaNeural")

    if not text:
        return "Missing 'text' parameter", 400

    filename = f"/tmp/{uuid.uuid4()}.mp3"

    async def run():
        communicate = edge_tts.Communicate(text, voice)
        await communicate.save(filename)

    asyncio.run(run())

    return send_file(filename, mimetype="audio/mpeg")

@app.route("/voices")
def voices():
    return jsonify([
        {
            "name": v["ShortName"],
            "display": f'{v["DisplayName"]} ({v["Locale"]})',
            "gender": v["Gender"]
        }
        for v in ENGLISH_VOICES
    ])

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
