from flask import Flask, jsonify, request
from flask_cors import CORS
import edge_tts
import asyncio

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Edge TTS Server is running."

@app.route("/voices", methods=["GET"])
def voices():
    try:
        voices_list = asyncio.run(edge_tts.list_voices())
        return jsonify(voices_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/speak", methods=["POST"])
def speak():
    try:
        data = request.json
        text = data.get("text")
        voice = data.get("voice", "en-US-AriaNeural")
        if not text:
            return jsonify({"error": "Missing 'text' in request"}), 400

        communicate = edge_tts.Communicate(text, voice)
        output_path = "output.mp3"
        asyncio.run(communicate.save(output_path))

        return jsonify({"message": "Speech generated", "file": output_path})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
