const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const { jsPDF } = require("jspdf");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "facturation",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get("/myHistory", (req, res) => {
  const query = "SELECT id, invoice_number, file_name FROM pdf_documents";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching PDF history: ", error);
      res.status(500).json({ error: "Server problem" });
      return;
    }
    res.json(results);
  });
});

app.post("/generate-pdf", (req, res) => {
  const { firstname, lastname, email, phone, invoiceNumber, articles } =
    req.body;
  const doc = new jsPDF();

  const myDate = new Date();
  const day = myDate.getDate().toString().padStart(2, "0");
  const month = (myDate.getMonth() + 1).toString().padStart(2, "0");
  const year = myDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  const fileName = `${firstname}_${lastname}_${formattedDate}.pdf`;

  let yPos = 20;
  doc.setFontSize(20).text("Informations Utilisateur :", 10, yPos);
  yPos += 10;
  doc.setFontSize(20).text(`Prénom : ${firstname}`, 10, yPos);
  yPos += 10;
  doc.setFontSize(20).text(`Nom : ${lastname}`, 10, yPos);
  yPos += 10;
  doc.setFontSize(20).text(`Email : ${email}`, 10, yPos);
  yPos += 10;
  doc.setFontSize(20).text(`Téléphone : ${phone}`, 10, yPos);
  yPos += 10;
  doc.setFontSize(20).text(`Type de Document : ${invoiceNumber}`, 10, yPos);
  yPos += 20;

  doc.setFontSize(20).text("Facture :", 10, yPos);
  yPos += 10;
  let totalPrice = 0;
  articles.forEach((article, index) => {
    doc
      .setFontSize(20)
      .text(
        `Article ${index + 1}: ${article.designation}, Prix unitaire: ${
          article.prix_unitaire
        } €, Quantité: ${article.quantite}`,
        10,
        yPos
      );
    yPos += 10;
    totalPrice += article.prix_unitaire * article.quantite;
  });
  doc.setFontSize(20).text(`Total: ${totalPrice} €`, 10, yPos);

  const values = {
    firstname,
    lastname,
    email,
    phone,
    invoice_number: invoiceNumber,
    file_name: fileName,
  };


  connection.query(
    "INSERT INTO pdf_documents SET ?",
    values,
    (error, results) => {
      if (error) {
        console.error(
          "Error while saving the PDF document to the database: ",
          error
        );
        res.status(500).json({ error: "Server problem" });
        return;
      }

      const documentId = results.insertId;

      const articleValues = articles.map((article) => [
        documentId,
        article.designation,
        article.prix_unitaire,
        article.quantite,
      ]);

      connection.query(
        "INSERT INTO pdf_document_articles (document_id, designation, prix_unitaire, quantite) VALUES ?",
        [articleValues],
        (articleError, articleResults) => {
          if (articleError) {
            console.error(
              "Error saving PDF document articles to database: ",
              articleError
            );
            res.status(500).json({ error: "Internal server error" });
            return;
          }
          res.send("PDF-document generated and saved to database.");
        }
      );
    }
  );
});

app.get("/download-pdf/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT file_name FROM pdf_documents WHERE id = ?",
    [id],
    (error, results) => {
      if (error || results.length === 0) {
        console.error("Error fetching PDF file name: ", error);
        res.status(404).json({ error: "PDF not found" });
        return;
      }
      const fileName = results[0].file_name;
      const file = `${__dirname}${fileName}`;
      res.download(file);

      res.download(file);
    }
  );
});

app.delete("/myHistory/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM pdf_documents WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error deleting PDF document: ", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.send("PDF-document deleted from database.");
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
