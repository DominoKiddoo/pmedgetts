from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import edge_tts
import asyncio
import uuid
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Optional: restrict to specific voices (en-US, en-GB, en-AU)
ENGLISH_VOICES = []

async def load_voices():
    global ENGLISH_VOICES
    voices = await edge_tts.list_voices()
    ENGLISH_VOICES = [v for v in voices if v["Locale"] in ("en-US", "en-GB", "en-AU")]

# Run async setup
asyncio.run(load_voices())

@app.route("/")
def home():
    return "Edge TTS server is running!"

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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
