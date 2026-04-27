# Countdown Signage

Web based countdown and announcement display using Flask.

## Setup

### 1. Install dependencies

```bash
pip install -e .
```

### 2. Create the instance folder

Flask loads configuration from an `instance/` folder in the project root. This folder is gitignored and must be created manually.

```
instance/
└── config.json
```

`config.json` requires two keys:

```json
{
    "SECRET_KEY": "<random string>",
    "UPLOAD_PASSWORD": "<password for the manage page>"
}
```

Generate a secret key with:

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

### 3. Create the assets folder

The following structure is required under `countdown/static/assets/`:

```
assets/
├── icons/
│   ├── favicon-16x16.png
│   └── favicon-32x32.png
└── images/
    ├── logo.png
    └── announcements/
```

The `announcements/` folder can start empty — slides are managed through the web interface at `/manage`.

## Usage

Start the server:

```bash
flask --app countdown run --host="0.0.0.0"
```

### Managing announcement slides

Navigate to `/manage` in a browser and sign in with the password set in `config.json`. From there you can upload new slides (PNG, JPG) and delete existing ones.

### Adjusting the timer

Edit `countdown/static/js/timer.js` and update `endHour`, `endMinute`, and `endSecond` to match your service start time.
