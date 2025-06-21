from flask import Flask, request, send_file
from flask_cors import CORS
import edge_tts
import asyncio
import uuid
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for CORS

@app.route("/")
def home():
    return "Flask server is running!"

@app.route("/tts")
def tts():
    text = request.args.get("text", "")
    if not text:
        return "Missing 'text' parameter", 400

    filename = f"/tmp/{uuid.uuid4()}.mp3"

    async def run():
        communicate = edge_tts.Communicate(text, "en-US-AriaNeural")
        await communicate.save(filename)

    asyncio.run(run())

    return send_file(filename, mimetype="audio/mpeg")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
