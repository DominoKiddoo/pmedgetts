from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import edge_tts
import asyncio
import uuid
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Edge TTS Server is running."

@app.route("/voices", methods=["GET"])
def voices():
    try:
        voices_list = asyncio.run(edge_tts.list_voices())

        # Allowed locales
        allowed_locales = {"en-AU", "en-US", "en-GB"}

        # Filter voices by locale prefix
        filtered_voices = [
            voice for voice in voices_list
            if any(
                voice.get("Locale", "").startswith(locale) or 
                voice.get("LocaleName", "").startswith(locale)
                for locale in allowed_locales
            )
        ]

        return jsonify(filtered_voices)
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
        output_path = f"output_{uuid.uuid4()}.mp3"
        asyncio.run(communicate.save(output_path))

        return jsonify({"message": "Speech generated", "file": output_path})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/tts", methods=["GET"])
def tss():
    text = request.args.get("text")
    voice = request.args.get("voice", "en-US-AriaNeural")

    if not text:
        return jsonify({"error": "Missing 'text' parameter"}), 400

    output_path = f"output_{uuid.uuid4()}.mp3"

    try:
        communicate = edge_tts.Communicate(text, voice)
        asyncio.run(communicate.save(output_path))

        response = send_file(output_path, mimetype="audio/mpeg")

        @response.call_on_close
        def cleanup():
            if os.path.exists(output_path):
                os.remove(output_path)

        return response
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
