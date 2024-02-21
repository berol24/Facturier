import React from "react";
import UsersForm from "./components/UsersForm";
import PdfHistory from "./components/PdfHistory";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UsersForm />} />
          <Route path="/history" element={<PdfHistory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
