import React, { useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { sendFormData } from "./pdfFunctions";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/logo.png";

function UsersForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    invoiceNumber: "",
  });

  const [articles, setArticles] = useState([]);
  const [designation, setDesignation] = useState("");
  const [prix, setPrix] = useState("");
  const [quantite, setQuantite] = useState("");
  const [prixTotal, setPrixTotal] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePdf();
    sendFormData({ ...formData, articles });
  };

  const ajouterArticle = () => {
    if (designation !== "" && prix !== "" && quantite !== "") {
      const nouvelArticle = {
        designation: designation,
        prix_unitaire: parseFloat(prix),
        quantite: parseInt(quantite),
      };
      setArticles([...articles, nouvelArticle]);
      setPrixTotal(prixTotal + parseFloat(prix) * parseInt(quantite));
      setDesignation("");
      setPrix("");
      setQuantite("");
    }
  };

  const generatePdf = () => {
    const { firstname, lastname, email, phone, invoiceNumber } = formData;
    const pdf = new jsPDF();
    let y = 10;
    let totalPrice = 0;
    const currentDate = new Date().toLocaleString();

    pdf.setFontSize(50);
    pdf.text("INVOICE", 10, (y += 20));
    pdf.addImage(logo, "PNG", 150, 10, 50, 50);

    let x = 10;
    pdf.setFontSize(12);
    pdf.text("Company Name", 10, (x += 40));
    pdf.setFont("900");
    pdf.text("Capacity", 50, (x += 0));
    pdf.setFont("900");
    pdf.setFontSize(12);
    pdf.text("Email", 10, (x += 10));
    pdf.setFont("900");

    pdf.text("capacity@gmail.com", 50, (x += 0));
    pdf.setFontSize(12);
    pdf.text("Phone", 10, (x += 10));
    pdf.setFont("900");
    pdf.text("123456789", 50, (x += 0));
    pdf.setFontSize(12);
    pdf.text("Web site", 10, (x += 10));
    pdf.setFont("900");
    pdf.text("capacitycompany.fr", 50, (x += 0));

    pdf.setFontSize(12);
    pdf.text(`Billing date:`, 90, (y += 80));
    pdf.setFontSize(15);
    pdf.text(`${currentDate}`, 130, y);
    pdf.setFontSize(12);
    pdf.text(`Firstname:`, 90, (y += 10));
    pdf.setFontSize(15);
    pdf.text(`${firstname}`, 130, y);
    pdf.setFontSize(12);
    pdf.text(`Lastname:`, 90, (y += 10));
    pdf.setFontSize(15);
    pdf.text(`${lastname}`, 130, y);
    pdf.setFontSize(12);
    pdf.text(`Email:`, 90, (y += 10));
    pdf.setFontSize(15);
    pdf.text(`${email}`, 130, y);
    pdf.setFontSize(12);
    pdf.text(`Phone:`, 90, (y += 10));
    pdf.setFontSize(15);
    pdf.text(`${phone}`, 130, y);
    pdf.setFontSize(12);
    pdf.text(`InvoiceNumber:`, 90, (y += 10));
    pdf.setFontSize(15);
    pdf.text(`${invoiceNumber}`, 130, y);

    pdf.text("", 10, (y += 20));
    y += 10;

    pdf.text("Designation", 20, y);
    pdf.text("Unit price", 95, y);
    pdf.text("Quantity", 170, y);

    articles.forEach((article, index) => {
      y += 10;
      pdf.text(`${article.designation}`, 20, y);
      pdf.text(`${article.prix_unitaire}€`, 95, y);
      pdf.text(`${article.quantite}`, 170, y);

      totalPrice += article.prix_unitaire * article.quantite;
    });

    y += 10;
    pdf.setDrawColor("#000000");
    pdf.rect(
      5,
      5,
      pdf.internal.pageSize.width - 10,
      pdf.internal.pageSize.height - 10,
      "S"
    );
    pdf.text(`Total price:`, 165, (y += 10));
    pdf.setTextColor("green");
    pdf.text(`${totalPrice} €`, 165, (y += 10));

    const myDate = new Date();
    const day = myDate.getDate().toString().padStart(2, "0");
    const month = (myDate.getMonth() + 1).toString().padStart(2, "0");
    const year = myDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    pdf.save(`${firstname}_${lastname}_${formattedDate}.pdf`);
  };

  return (
    <div className="container ">
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="m-0">Invoice</h1>
          <div>
            <Link to="/history" className="me-3 btn btn-info">
              My history
            </Link>
            <button type="submit" className="btn btn-primary">
              Générer mon PDF
            </button>
          </div>
        </div>

        <div className="d-flex flex-column">
          <div className="mb-3 row">
            <div className="col">
              <label htmlFor="firstname" className="form-label">
                Firstname :
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <label htmlFor="lastname" className="form-label">
                Lastname :
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label htmlFor="email" className="form-label">
                Email :
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <label htmlFor="phone" className="form-label">
                Phone :
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="invoiceNumber" className="form-label">
              InvoiceNumber :
            </label>
            <input
              type="text"
              className="form-control"
              id="invoiceNumber"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <h2>Add an article</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Unit price"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Quantity"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={ajouterArticle}
          className="btn btn-primary my-5"
        >
          Add
        </button>

        <table className="table">
          <thead>
            <tr className="border border-success p-2 mb-2 border-opacity-50">
              <th className="border border-success p-2 mb-2 border-opacity-50">
                Designation
              </th>
              <th className="border border-success p-2 mb-2 border-opacity-50">
                Unit price
              </th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr
                key={index}
                className="border border-success p-2 mb-2 border-opacity-50"
              >
                <td className="border border-success p-2 mb-2 border-opacity-50">
                  {article.designation}
                </td>
                <td className="border border-success p-2 mb-2 border-opacity-50">
                  {article.prix_unitaire} €
                </td>
                <td>{article.quantite}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border border-success p-2 mb-2 border-opacity-50">
              <td className="border border-success p-2 mb-2 border-opacity-50">
                Total
              </td>
              <td colSpan="2" style={{ fontWeight: "bold", color: "green" }}>
                {prixTotal} €
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
    </div>
  );
}

export default UsersForm;
