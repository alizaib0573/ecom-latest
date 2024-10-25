const express = require("express");
const multer = require("multer");
const Image = require("../Models/FileUpload");
const path = require("path");

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Multer instance
const upload = multer({ storage });

// Route for uploading single or multiple images
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    // Check if files exist in the request
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Save each image file to the database
    const uploadedImages = [];
    for (const file of req.files) {
      const newImage = new Image({
        filename: file.filename,
        path: file.path,
      });
      await newImage.save();

      const imageUrl = `http://localhost:8080/uploads/${file.filename}`;
      uploadedImages.push(imageUrl);
    }

    // Return all uploaded image URLs in response
    res
      .status(201)
      .json({ message: "Images uploaded successfully", uploadedImages });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error uploading images", error: err.message });
  }
});

// Route to fetch an image by its ID
router.get("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Send the image file as a response
    res.sendFile(path.resolve(image.path));
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching image", error: err.message });
  }
});

module.exports = router;
