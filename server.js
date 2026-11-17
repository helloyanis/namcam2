const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// CONFIG
const USE_WEBCAM = true;
const STATIC_IMAGE_PATH = '/home/helloyanis/Images/Yanis Icon Pack/img2.jpg';
const TEMP_IMAGE = path.join(__dirname, 'webcam.jpg');

app.get('/img.jpg', (req, res) => {
    if (USE_WEBCAM) {
        console.log('Capturing webcam image...');
        captureWebcam((err) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            fs.readFile(TEMP_IMAGE, (err, data) => {
                if (err) {
                    return res.status(500).send('Read failed');
                }

                res.set({
                    'Content-Type': 'image/jpeg',
                    'Content-Length': data.length,
                    'Connection': 'close'
                });

                res.end(data);
            });
        });
    } else {
        console.log('Serving static image...');
        const data = fs.readFileSync(STATIC_IMAGE_PATH);

        res.set({
            'Content-Type': 'image/jpeg',
            'Content-Length': data.length,
            'Connection': 'close'
        });

        res.end(data);
    }
});

let capturing = false;

function captureWebcam(callback) {
    if (capturing) return callback(new Error('Busy'));

    capturing = true;

    const command = `ffmpeg -y -nostdin -loglevel error -f video4linux2 -i /dev/video0 -frames:v 1 -q:v 2 ${TEMP_IMAGE}`;

    exec(command, { timeout: 10000 }, (error) => {
        capturing = false;

        if (error) {
            return callback(error);
        }

        fs.access(TEMP_IMAGE, fs.constants.R_OK, (accessErr) => {
            callback(accessErr || null);
        });
    });
}

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/img.jpg`);
});