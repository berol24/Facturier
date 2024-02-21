import React, { useState, useEffect } from "react";
import { handleDownload, handleDelete, fetchPdfHistory } from "./pdfFunctions";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
function PdfHistory() {
  const [pdfHistory, setPdfHistory] = useState([]);

  useEffect(() => {
    fetchPdfHistory(setPdfHistory);
  }, []);

  const handleRetelecharger = (id, fileName) => {
    handleDownload(id, fileName);
  };

  const handleSupprimer = async (id) => {
    try {
      await handleDelete(id);
      setPdfHistory(pdfHistory.filter((pdf) => pdf.id !== id));
    } catch (error) {
      console.error("Error deleting PDF: ", error);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/" className="btn btn-primary">
          Back
        </Link>
        <h1 className="text-center">My Pdf histories</h1>
        <div></div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Document name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pdfHistory.map((pdf) => (
            <tr key={pdf.id}>
              <td>{pdf.file_name}</td>
              <td>
                <button
                  onClick={() => handleRetelecharger(pdf.id, pdf.file_name)}
                  className="btn btn-primary me-2"
                >
                  Redownload
                </button>
                <button
                  onClick={() => handleSupprimer(pdf.id)}
                  className="btn btn-danger"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PdfHistory;
