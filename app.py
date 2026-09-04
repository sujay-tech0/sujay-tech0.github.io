from flask import Flask, render_template, jsonify, send_from_directory

app = Flask(__name__)

# Map key -> audio file (served from /static/audio/)
SOUND_MAP = {
    "1": "magic-intro.wav",
    "2": "trumpet-fanfare.wav",
}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/sound/<key>")
def get_sound(key):
    """Backend endpoint that tells the frontend which file to play for a given key."""
    filename = SOUND_MAP.get(key)
    if not filename:
        return jsonify({"error": "No sound mapped to that key"}), 404
    return jsonify({"file": f"/static/audio/{filename}"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
