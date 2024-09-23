const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const Tesseract = require('tesseract.js');

const ImageConverterController = async (req, res) => {
    const format = req.body.format;
    const file = req.file;
    const width = req.body.width;
    const height = req.body.height;
    const includeMetadata = req.body.includeMetadata;
    const quality = Number(req.body.quality);
    let metadata;

    if (!file) {
        return res.status(400).send("No file uploaded.");
    }

    if (quality) {
        await sharp(file.path)
            .jpeg({ quality: quality })
    }

    const outputFilePath = `output.${format}`;

    try {
        let sharpImage = sharp(file.path);

        if (width && height) {
            sharpImage = sharpImage
                .resize({ width: parseInt(width), height: parseInt(height), kernel: sharp.kernel.lanczos3 }) // Resize with a quality kernel
                .sharpen(); // Apply sharpening
        }

        if (format) {
            await sharpImage.toFormat(format, { quality: 90 }) // Set quality when saving
                .toFile(outputFilePath);
        }

        res.setHeader('Content-Type', `image/${format}`);
        res.setHeader('Content-Disposition', `attachment; filename=${outputFilePath}`);
        res.sendFile(path.resolve(outputFilePath), (err) => {
            if (err) {
                res.status(500).send('Error sending the file.');
            } else {
                fs.unlink(file.path, () => { });
                fs.unlink(outputFilePath, () => { });
            }
        });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Error processing the image.');
    }
}

const MetaDetaCont = async (req, res) => {
    const file = req.file;

    try {
        if (!file) {
            return res.status(400).send("No file uploaded.");
        }
        const { data: { text } } = await Tesseract.recognize(file.path, 'eng');
        res.json({ text, message: "success" })
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Error processing the image.');
    }
}

module.exports = { ImageConverterController, MetaDetaCont };
