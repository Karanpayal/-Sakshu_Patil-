import { useState, useRef } from "react";
import html2canvas from "html2canvas";

type TransactionType = "sent" | "received";
type TransactionStatus = "success" | "pending" | "failed";

interface TransactionData {
  type: TransactionType;
  amount: string;
  recipientName: string;
  upiId: string;
  transactionId: string;
  dateTime: string;
  status: TransactionStatus;
  note: string;
}

export default function App() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  
  const [data, setData] = useState<TransactionData>({
    type: "sent",
    amount: "500",
    recipientName: "John Doe",
    upiId: "john@ybl",
    transactionId: "T" + Date.now().toString().slice(-10),
    dateTime: new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    status: "success",
    note: "",
  });

  const updateField = <K extends keyof TransactionData>(
    key: K,
    value: TransactionData[K]
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const generateTransactionId = () => {
    updateField("transactionId", "T" + Date.now().toString().slice(-10));
  };

  const updateDateTime = () => {
    updateField(
      "dateTime",
      new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
  };

  const downloadScreenshot = async () => {
    if (!previewRef.current) return;
    
    setDownloading(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
      });
      
      const link = document.createElement("a");
      link.download = `phonepe-${data.type}-${data.amount}-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Error generating screenshot:", err);
      alert("Screenshot तयार करण्यात त्रुटी / Error creating screenshot");
    } finally {
      setDownloading(false);
    }
  };

  const getStatusIcon = () => {
    if (data.status === "success") return "✓";
    if (data.status === "pending") return "⏳";
    return "✗";
  };

  const getStatusColor = () => {
    if (data.status === "success") return "#22c55e";
    if (data.status === "pending") return "#f59e0b";
    return "#ef4444";
  };

  const getStatusText = () => {
    if (data.status === "success") return "Transaction Successful";
    if (data.status === "pending") return "Transaction Pending";
    return "Transaction Failed";
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>💰 PhonePe Screenshot Maker</h1>
        <p className="subtitle">
          PhonePe payment screenshot तयार करा / Create PhonePe payment screenshots
        </p>
      </header>

      <div className="app-content">
        {/* Form Section */}
        <div className="form-section">
          <h2>तपशील / Details</h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Transaction Type / प्रकार</label>
              <select
                value={data.type}
                onChange={(e) => updateField("type", e.target.value as TransactionType)}
              >
                <option value="sent">पैस पाठवले / Sent Money</option>
                <option value="received">पैस आले / Received Money</option>
              </select>
            </div>

            <div className="form-group">
              <label>Amount / रक्कम (₹)</label>
              <input
                type="number"
                value={data.amount}
                onChange={(e) => updateField("amount", e.target.value)}
                placeholder="500"
              />
            </div>

            <div className="form-group">
              <label>
                {data.type === "sent" ? "Recipient / ज्यांना पाठवले" : "Sender / ज्यांनी पाठवले"}
              </label>
              <input
                type="text"
                value={data.recipientName}
                onChange={(e) => updateField("recipientName", e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label>
                {data.type === "sent" ? "Recipient UPI / प्राप्तकर्ता UPI" : "Sender UPI / प्रेषक UPI"}
              </label>
              <input
                type="text"
                value={data.upiId}
                onChange={(e) => updateField("upiId", e.target.value)}
                placeholder="john@ybl"
              />
            </div>

            <div className="form-group">
              <label>Transaction ID / व्यवहार क्रमांक</label>
              <div className="input-with-button">
                <input
                  type="text"
                  value={data.transactionId}
                  onChange={(e) => updateField("transactionId", e.target.value)}
                  placeholder="T1234567890"
                />
                <button onClick={generateTransactionId} className="btn-small">
                  🔄
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Date & Time / तारीख आणि वेळ</label>
              <div className="input-with-button">
                <input
                  type="text"
                  value={data.dateTime}
                  onChange={(e) => updateField("dateTime", e.target.value)}
                  placeholder="23 Oct 2026, 10:30 AM"
                />
                <button onClick={updateDateTime} className="btn-small">
                  🕐
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Status / स्थिती</label>
              <select
                value={data.status}
                onChange={(e) => updateField("status", e.target.value as TransactionStatus)}
              >
                <option value="success">✓ Success / यशस्वी</option>
                <option value="pending">⏳ Pending / प्रलंबित</option>
                <option value="failed">✗ Failed / अयशस्वी</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Note / टीप (Optional)</label>
              <input
                type="text"
                value={data.note}
                onChange={(e) => updateField("note", e.target.value)}
                placeholder="For lunch, rent, etc."
              />
            </div>
          </div>

          <button
            onClick={downloadScreenshot}
            disabled={downloading}
            className="btn-download"
          >
            {downloading ? "तयार करत आहे..." : "📥 Screenshot डाउनलोड करा / Download"}
          </button>
        </div>

        {/* Preview Section */}
        <div className="preview-section">
          <h2>पूर्वावलोकन / Preview</h2>
          
          <div className="phone-frame">
            <div ref={previewRef} className="phonepe-screenshot">
              {/* PhonePe Header */}
              <div className="pp-header">
                <div className="pp-header-top">
                  <span className="pp-back">←</span>
                  <span className="pp-title">PhonePe</span>
                  <span className="pp-menu">⋮</span>
                </div>
              </div>

              {/* Status Section */}
              <div className="pp-status-section">
                <div
                  className="pp-status-icon"
                  style={{ backgroundColor: getStatusColor() }}
                >
                  {getStatusIcon()}
                </div>
                <h2 className="pp-status-text">{getStatusText()}</h2>
              </div>

              {/* Amount Section */}
              <div className="pp-amount-section">
                <div className="pp-amount">₹{data.amount}</div>
              </div>

              {/* Details Section */}
              <div className="pp-details">
                <div className="pp-detail-row">
                  <span className="pp-detail-label">
                    {data.type === "sent" ? "Paid to / ज्यांना पैसे दिले" : "Received from / ज्यांच्याकडून आले"}
                  </span>
                  <span className="pp-detail-value">{data.recipientName}</span>
                </div>

                <div className="pp-detail-row">
                  <span className="pp-detail-label">
                    {data.type === "sent" ? "UPI ID" : "From UPI"}
                  </span>
                  <span className="pp-detail-value">{data.upiId}</span>
                </div>

                <div className="pp-detail-row">
                  <span className="pp-detail-label">Transaction ID / व्यवहार क्रमांक</span>
                  <span className="pp-detail-value">{data.transactionId}</span>
                </div>

                <div className="pp-detail-row">
                  <span className="pp-detail-label">Date & Time / तारीख आणि वेळ</span>
                  <span className="pp-detail-value">{data.dateTime}</span>
                </div>

                {data.note && (
                  <div className="pp-detail-row">
                    <span className="pp-detail-label">Note / टीप</span>
                    <span className="pp-detail-value">{data.note}</span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pp-footer">
                <div className="pp-footer-text">
                  Made with 💜 in India
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
