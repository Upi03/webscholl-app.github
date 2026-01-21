const sharp = require('sharp');
const path = require('path');

const inputPath = 'e:\\projectweb-app\\public\\webschool-logo.png';
const outputPath = 'e:\\projectweb-app\\public\\webschool-logo-transparent.png';

async function processImage() {
    try {
        const { data, info } = await sharp(inputPath)
            .ensureAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });

        // Iterate through pixels and set alpha to 0 for white/near-white pixels
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // If pixel is white or very light gray
            if (r > 240 && g > 240 && b > 240) {
                data[i + 3] = 0; // Set alpha to transparent
            }
        }

        await sharp(data, {
            raw: {
                width: info.width,
                height: info.height,
                channels: 4
            }
        }).toFile(outputPath);

        console.log('Successfully processed image and removed white background');
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

processImage();
