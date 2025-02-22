"use client";

import { Download } from "lucide-react"; // Import a download icon

import { useState } from "react";
import { DownloadGmcProductsPage } from "../lib/products";

export function ProductDownloadButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await DownloadGmcProductsPage();
    } catch (err) {
      console.error("Download failed:", err);
      setError("Failed to download products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="download-section">
      <button
        onClick={handleDownload}
        disabled={isLoading}
        className="download-button"
      >
        {isLoading ? (
          <span className="spinner">⏳</span>
        ) : (
          <>
            <Download className="icon" />
            Download GMC Catalog
          </>
        )}
      </button>

      {error && <div className="error-message">{error}</div>}

      <style jsx>{`
        .download-button {
          padding: 12px 24px;
          background: #3182ce;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.3s ease;
        }

        .download-button:hover {
          background: #2b6cb0;
        }

        .download-button:disabled {
          background: #a0aec0;
          cursor: not-allowed;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        .error-message {
          color: #e53e3e;
          margin-top: 8px;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
