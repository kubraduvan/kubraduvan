import React from "react";
import "./App.css";
import { CreditCalculateForm } from "./components/CreditCalculateForm";
import { CreditSummary } from "./components/CreditSummary";
import { TaxInformation } from "./components/TaxInformation";


function App() {
  return (
    <div className="App">
      <h1>Kredi Hesaplama</h1>
      <CreditCalculateForm></CreditCalculateForm>
      <TaxInformation />
      <CreditSummary></CreditSummary>
    </div>
  );
}

export default App;
