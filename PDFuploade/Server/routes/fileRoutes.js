import express from "express";
import mongoose from "mongoose";
import { Readable } from "stream";
import upload from "../middleware/upload.js";
import PdfDocument from "../models/PdfDocument.js";

const router = express.Router();
let bucket;

mongoose.connection.once("open", () => {
  bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "pdfs",
  });
});

router.post("/upload", upload.array("pdfs", 10), async (req, res) => {
  try {
    const { university, college, course, department, year } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "PDF files are required" });
    }

    const savedDocs = [];

    for (const file of req.files) {
      const stream = Readable.from(file.buffer);

      const uploadStream = bucket.openUploadStream(file.originalname, {
        contentType: "application/pdf",
      });

      stream.pipe(uploadStream);

      await new Promise((resolve, reject) => {
        uploadStream.on("finish", resolve);
        uploadStream.on("error", reject);
      });

      const document = new PdfDocument({
        university,
        college,
        course,
        department,
        year,
        pdfFileId: uploadStream.id,
        pdfFilename: file.originalname,
      });

      const saved = await document.save();
      savedDocs.push(saved);
    }

    res.status(201).json({
      message: "PDFs and form data saved successfully",
      data: savedDocs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
