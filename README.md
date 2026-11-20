# Namcam2 (Sega triforce camera) server for Dolphin

This is a server that allows usage of your real camera or an image as the camera feed for Triforce games (MarioKart Arcade GP 1 & 2) emulated on Dolphin.

## Setup

- You need node.js installed, and ffmpeg if you want to use a camera and not an image
- Click on the green `Code` button, then `Download zip`. Extract it somewhere.
- If you want to use a real webcam, make sure it outputs a 320x240 video feed. You can change that using OBS. Change `USE_WEBCAM` to `true` in `server.js`.
- If you want to use an image, replace `/home/path-to-your-image.jpg` with the path of an actual 320x240 jpg image in `server.js`
- Open a terminal window in the directory that has server.js and type `npm i` to install the dependencies (needed only once)
- Once that's done, type `node server.js` to start the server. It should then give you instructions on how to set up dolphin to listen to this server.
- To debug it, open http://127.0.0.1:3000/img.jpg (or replace the IP by the one given by the program) and you should see your image with the correct dimentions