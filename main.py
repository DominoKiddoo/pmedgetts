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
    return (
        "Microsoft Edge TTS API<br>"
        "Documentation: <a href='https://github.com/DominoKiddoo/pmedgetts/tree/main'>GitHub Repo</a><br>"
        "Penguinmod Extension URL: <a href='https://raw.githubusercontent.com/DominoKiddoo/pmedgetts/refs/heads/main/penguinmod-extension/edgetts.js?token=GHSAT0AAAAAADGCKV2MD57Z5HXLI5NPZFLC2CXYLBA'>Extension Link</a>"
    )

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

@app.route("/downloadpmextension")
def download_pm_extension():
    filename = "penguinmod-extension/edgetts.js"  # Adjust path if needed
    if not os.path.exists(filename):
        return "Extension file not found.", 404

    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Downloading...</title>
    </head>
    <body>
        <a id="download" href="/static/{filename}" download style="display:none;">Download</a>
        <script>
            const link = document.getElementById('download');
            link.click();
            setTimeout(() => window.close(), 3000); // Close after 3 seconds
        </script>
        <p>Downloading PenguinMod extension...</p>
    </body>
    </html>
    """


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
