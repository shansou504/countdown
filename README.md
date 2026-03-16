# Countdown Signage

Web based countdown and announcement display in vanilla html, css, and javascript.

## Setup

Because this is a static site, the ```subtitle``` and ```announcement``` arrays in ```js/timer.js``` will need to be updated with your content and file list.

Furthermore, an ```images``` folder will need to be created with a ```announcements``` subfolder containing the images. The ```images``` folder will also need an ```icons``` subfolder with contents ```favicon-16x16``` and ```favicon-32x32```. Lastly, ```images``` also needs a ```logo``` image.

## Usage

From the command line within the root directory of this project, run ```python3 -m http.server```

From the client device open a web browser pointed to ```http://localhost:8000```

To adjust the timer, edit ```js/timer.js```