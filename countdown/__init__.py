from flask import Flask, render_template, url_for, request, redirect, session
from functools import wraps
from pathlib import Path
from werkzeug.utils import secure_filename
import json

ALLOWED_EXTENSIONS = {".png", ".jpg", ".jpeg"}

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_file("config.json", load=json.load)

    announcements_folder = Path(app.static_folder) / "assets/images/announcements"

    def login_required(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if not session.get("authenticated"):
                return redirect(url_for("login"))
            return f(*args, **kwargs)
        return decorated

    @app.route("/")
    def index():
        return render_template("index.html")

    @app.route("/announcements.json")
    def announcements_json():
        slides = sorted(f.name for f in announcements_folder.iterdir() if f.suffix.lower() in ALLOWED_EXTENSIONS)
        return [url_for("static", filename=f"assets/images/announcements/{n}") for n in slides]

    @app.route("/login", methods=["GET", "POST"])
    def login():
        error = None
        if request.method == "POST":
            if request.form.get("password") == app.config["UPLOAD_PASSWORD"]:
                session["authenticated"] = True
                return redirect(url_for("manage"))
            error = "Incorrect password."
        return render_template("login.html", error=error)

    @app.route("/logout", methods=["POST"])
    def logout():
        session.clear()
        return redirect(url_for("login"))

    @app.route("/manage")
    @login_required
    def manage():
        slides = sorted(f.name for f in announcements_folder.iterdir() if f.suffix.lower() in ALLOWED_EXTENSIONS)
        return render_template("manage.html", slides=slides)

    @app.route("/upload", methods=["POST"])
    @login_required
    def upload():
        for file in request.files.getlist("slides"):
            filename = secure_filename(file.filename)
            if filename and Path(filename).suffix.lower() in ALLOWED_EXTENSIONS:
                file.save(announcements_folder / filename)
        return redirect(url_for("manage"))

    @app.route("/delete/<filename>", methods=["POST"])
    @login_required
    def delete(filename):
        target = announcements_folder / secure_filename(filename)
        if target.exists() and target.suffix.lower() in ALLOWED_EXTENSIONS:
            target.unlink()
        return redirect(url_for("manage"))

    return app
