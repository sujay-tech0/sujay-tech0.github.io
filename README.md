# Press 1 / Press 2 Music App

A tiny full-stack app: a Flask backend that maps keys to sound files, and a
frontend that plays the right sound when you press **1** or **2** (or click
the on-screen buttons).

## How it works
- `app.py` — Flask backend. `GET /api/sound/<key>` returns the audio file
  path mapped to that key (see `SOUND_MAP` in `app.py`).
- `templates/index.html` — the page. Listens for keydown events on 1/2,
  asks the backend which file to play, then plays it with an `<audio>` tag.
- `static/audio/` — your two sound files:
  - `magic-intro.wav` (key 1)
  - `trumpet-fanfare.wav` (key 2)

## Run it locally
```bash
pip install -r requirements.txt
python app.py
```
Then open http://localhost:5000 in your browser and press 1 or 2.

## Add more sounds later
1. Drop a new audio file into `static/audio/`.
2. Add an entry to `SOUND_MAP` in `app.py`, e.g. `"3": "my-new-sound.wav"`.
3. Add a matching button/key in `index.html` if you want an on-screen key too.

## Deploying
This is a standard Flask app, so it deploys anywhere Flask does — Render,
Railway, Fly.io, PythonAnywhere, a VPS with gunicorn + nginx, etc. For
production, run it behind a real WSGI server instead of `python app.py`,
e.g.:
```bash
gunicorn -w 2 -b 0.0.0.0:8000 app:app
```
