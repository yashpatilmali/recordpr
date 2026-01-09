import mongoose from "mongoose";

const pdfDocumentSchema = new mongoose.Schema(
  {
    university: { type: String, required: true },
    college: { type: String, required: true },
    course: { type: String, required: true },
    department: { type: String, required: true },
    year: { type: String, required: true },
    pdfFileId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    pdfFilename: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PdfDocument", pdfDocumentSchema);
