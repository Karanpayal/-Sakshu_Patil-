import { useState, useCallback, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

// Set up the worker using the legacy build (more compatible)
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.mjs",
  import.meta.url
).toString();

type ExtractionStatus = "idle" | "extracting" | "done" | "error";

export default function App() {
  const [fileName, setFileName] = useState<string>("");
  const [extractedText, setExtractedText] = useState<string>("");
  const [status, setStatus] = useState<ExtractionStatus>("idle");
  const [progress, setProgress] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractTextFromPDF = useCallback(async (file: File) => {
    if (
      !file.type.includes("pdf") &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setErrorMsg("कृपया फक्त PDF फाइल निवडा / Please select a PDF file");
      setStatus("error");
      return;
    }

    if (file.size === 0) {
      setErrorMsg("फाइल रिकामी आहे / The file is empty (0 bytes). Please select a valid PDF.");
      setStatus("error");
      return;
    }

    setFileName(file.name);
    setStatus("extracting");
    setExtractedText("");
    setErrorMsg("");
    setProgress("PDF लोड होत आहे... / Loading PDF...");

    try {
      // Use FileReader for better compatibility
      const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = () => reject(new Error("फाइल वाचण्यात त्रुटी / Failed to read file"));
        reader.readAsArrayBuffer(file);
      });
      
      console.log("File size:", file.size, "bytes, ArrayBuffer size:", arrayBuffer.byteLength);

      // Check if buffer is actually empty
      if (arrayBuffer.byteLength === 0) {
        throw new Error("फाइल रिकामी आहे / File is empty (0 bytes)");
      }

      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
      const totalPages = pdf.numPages;
      let fullText = "";

      for (let i = 1; i <= totalPages; i++) {
        setProgress(
          `पान ${i}/${totalPages} प्रक्रिया करत आहे... / Processing page ${i}/${totalPages}...`
        );
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => ("str" in item ? item.str : ""))
          .join(" ");
        fullText += pageText + "\n\n";
      }

      setExtractedText(fullText.trim());
      setStatus("done");
      setProgress("");
    } catch (err: any) {
      console.error("PDF extraction error:", err);
      let errorMsg = `PDF वाचण्यात त्रुटी / Error reading PDF`;
      
      if (err.name === "InvalidPDFException") {
        errorMsg = "ही वैध PDF फाइल नाही / This is not a valid PDF file. Please check the file.";
      } else if (err.message?.includes("empty")) {
        errorMsg = "फाइल रिकामी आहे / The file is empty";
      } else if (err.message) {
        errorMsg += `: ${err.message}`;
      }
      
      setErrorMsg(errorMsg);
      setStatus("error");
    }
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) extractTextFromPDF(file);
    },
    [extractTextFromPDF]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) extractTextFromPDF(file);
    },
    [extractTextFromPDF]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = extractedText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [extractedText]);

  const downloadAsText = useCallback(() => {
    const baseName = fileName.replace(/\.pdf$/i, "");
    const blob = new Blob([extractedText], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [extractedText, fileName]);

  const resetApp = useCallback(() => {
    setFileName("");
    setExtractedText("");
    setStatus("idle");
    setProgress("");
    setErrorMsg("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const wordCount = extractedText
    ? extractedText.split(/\s+/).filter(Boolean).length
    : 0;
  const charCount = extractedText.length;

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-icon">📄</div>
        <h1>PDF to Text Converter</h1>
        <p className="subtitle">
          PDF मधून मजकूर काढा / Extract text from PDF files
        </p>
      </header>

      <main className="app-main">
        {/* Upload Area */}
        <div
          className={`drop-zone ${isDragging ? "dragging" : ""} ${status === "done" ? "has-result" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            hidden
          />
          {status === "idle" || status === "error" ? (
            <div className="drop-zone-content">
              <div className="upload-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="12" y2="12" />
                  <line x1="15" y1="15" x2="12" y2="12" />
                </svg>
              </div>
              <p className="drop-text">
                PDF इथे टाका किंवा{" "}
                <span className="browse-link">ब्राउझ करा</span>
              </p>
              <p className="drop-subtext">Drop PDF here or click to browse</p>
            </div>
          ) : status === "extracting" ? (
            <div className="drop-zone-content extracting">
              <div className="spinner" />
              <p className="progress-text">{progress}</p>
              {fileName && <p className="file-name">{fileName}</p>}
            </div>
          ) : (
            <div className="drop-zone-content done">
              <div className="success-icon">✓</div>
              <p className="file-name">{fileName}</p>
              <p className="done-text">
                मजकूर यशस्वीरित्या काढला / Text extracted successfully
              </p>
              <button
                className="btn btn-secondary btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  resetApp();
                }}
              >
                नवीन PDF / New PDF
              </button>
            </div>
          )}
        </div>

        {/* Error Message */}
        {status === "error" && errorMsg && (
          <div className="error-banner">
            <span className="error-icon">⚠️</span>
            {errorMsg}
          </div>
        )}

        {/* Results */}
        {status === "done" && extractedText && (
          <div className="results-section">
            <div className="results-header">
              <div className="stats">
                <span className="stat-badge">
                  {wordCount.toLocaleString()} शब्द / words
                </span>
                <span className="stat-badge">
                  {charCount.toLocaleString()} अक्षरे / chars
                </span>
              </div>
              <div className="action-buttons">
                <button className="btn btn-primary" onClick={copyToClipboard}>
                  {copied ? "✓ कॉपी केले!" : "📋 कॉपी करा / Copy"}
                </button>
                <button className="btn btn-secondary" onClick={downloadAsText}>
                  ⬇ डाउनलोड / Download .txt
                </button>
              </div>
            </div>
            <div className="text-output">
              <pre>{extractedText}</pre>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          सर्व प्रक्रिया ब्राउझरमध्ये होते — कोणतीही फाइल सर्व्हरवर अपलोड होत
          नाही
        </p>
        <p>
          All processing happens in your browser — no files are uploaded to any
          server
        </p>
      </footer>
    </div>
  );
}
