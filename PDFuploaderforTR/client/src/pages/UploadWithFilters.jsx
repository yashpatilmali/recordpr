import { useState } from "react";
import FilterSelect from "../components/FilterSelect";
import { universities } from "../data/dummyData";

const API_BASE_URL = "http://localhost:5000/api/files";

export default function UploadWithFilters() {
  const [university, setUniversity] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  const filtersSelected = university && college && course && department && year;

  const handleUniversityChange = (value) => {
    setUniversity(value);
    setCollege("");
    setCourse("");
    setDepartment("");
    setYear("");
  };

  const handleCollegeChange = (value) => {
    setCollege(value);
    setCourse("");
    setDepartment("");
    setYear("");
  };

  const handleCourseChange = (value) => {
    setCourse(value);
    setDepartment("");
    setYear("");
  };

  const handleFiles = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedFiles = Array.from(e.target.files).filter(
      (file) => file.type === "application/pdf"
    );

    const filesWithPreview = selectedFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...filesWithPreview]);
  };

  const removeFile = (index) => {
    URL.revokeObjectURL(files[index].previewUrl);
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const previewPDF = (url) => {
    window.open(url, "_blank");
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!filtersSelected || files.length === 0) return;

    setIsUploading(true);
    setUploadMessage("");

    try {
      const formData = new FormData();

      formData.append("university", university);
      formData.append("college", college);
      formData.append("course", course);
      formData.append("department", department);
      formData.append("year", year);

      files.forEach(({ file }) => {
        formData.append("pdfs", file);
      });

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadMessage(`Success! ${data.message}`);

        files.forEach((f) => URL.revokeObjectURL(f.previewUrl));

        setFiles([]);
        setUniversity("");
        setCollege("");
        setCourse("");
        setDepartment("");
        setYear("");
      } else {
        setUploadMessage(data.message || "Upload failed");
      }
    } catch (err) {
      setUploadMessage("Network error during upload");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      <form
        onSubmit={handleUpload}
        className="bg-white w-full max-w-4xl p-10 rounded-3xl shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Upload Academic Records
        </h1>

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <FilterSelect
            label="University"
            value={university}
            onChange={handleUniversityChange}
            options={Object.keys(universities)}
          />
          <FilterSelect
            label="College"
            value={college}
            onChange={handleCollegeChange}
            options={
              university ? Object.keys(universities[university].colleges) : []
            }
            disabled={!university}
          />
          <FilterSelect
            label="Course"
            value={course}
            onChange={handleCourseChange}
            options={
              college
                ? Object.keys(
                    universities[university].colleges[college].courses
                  )
                : []
            }
            disabled={!college}
          />
          <FilterSelect
            label="Department"
            value={department}
            onChange={setDepartment}
            options={
              course
                ? universities[university].colleges[college].courses[course]
                    .departments
                : []
            }
            disabled={!course}
          />
          <FilterSelect
            label="Year"
            value={year}
            onChange={setYear}
            options={
              course
                ? universities[university].colleges[college].courses[course]
                    .years
                : []
            }
            disabled={!course}
          />
        </div>

        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center ${
            filtersSelected
              ? "border-blue-400 bg-blue-100"
              : "border-gray-300 bg-gray-100 opacity-50"
          }`}
        >
          <input
            type="file"
            accept="application/pdf"
            multiple
            disabled={!filtersSelected}
            onChange={handleFiles}
          />
          <p className="mt-2 text-sm text-gray-600">
            Select multiple PDF files (Preview only, not uploaded yet)
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold text-blue-700 mb-3">
              Selected PDFs (Preview)
            </h3>

            <div className="space-y-3">
              {files.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-blue-50 p-3 rounded-lg"
                >
                  <span className="truncate">{item.file.name}</span>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => previewPDF(item.previewUrl)}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-600 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {uploadMessage && (
          <div
            className={`mt-4 p-3 rounded-lg text-center ${
              uploadMessage.includes("Success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {uploadMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={!filtersSelected || files.length === 0 || isUploading}
          className="mt-8 w-full py-3 rounded-full bg-blue-600 text-white font-semibold
                     hover:bg-blue-700 disabled:opacity-40"
        >
          {isUploading ? "Uploading..." : `Upload ${files.length} PDF(s)`}
        </button>
      </form>
    </div>
  );
}
