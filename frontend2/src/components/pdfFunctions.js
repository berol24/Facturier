import { saveAs } from "file-saver";

export const sendFormData = async (formData) => {
  try {
    const response = await fetch("http://localhost:5000/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const message = await response.text();
    alert(message);
  } catch (error) {
    console.error("Error sending form data: ", error);
  }
};

export const fetchPdfHistory = async (setPdfHistory) => {
  try {
    const response = await fetch("http://localhost:5000/myHistory");
    const data = await response.json();
    setPdfHistory(data);
  } catch (error) {
    console.error("Error fetching PDF-history: ", error);
  }
};

export const handleDownload = async (id, fileName) => {
  try {
    const response = await fetch(`http://localhost:5000/download-pdf/${id}`);
    const blob = await response.blob();
    saveAs(blob, fileName);
  } catch (error) {
    console.error("Error downloading PDF-document: ", error);
  }
};

export const handleDelete = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/myHistory/${id}`, {
      method: "DELETE",
    });
    const message = await response.text();
    console.log(message);
  } catch (error) {
    console.error("Error deleting PDF-document: ", error);
  }
};
