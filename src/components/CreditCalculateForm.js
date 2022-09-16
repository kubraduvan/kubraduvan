import { useState, useEffect, useContext, createContext } from "react";
import { CreditSummary } from "./CreditSummary";

export const context = createContext(null);

const CreditCalculateForm = () => {
  const [creditAmount, setCreditAmount] = useState();
  const [installmentCount, setInstallmentCount] = useState();
  const [interestRate, setInterestRate] = useState();
  const [period, setPeriod] = useState(7);
  const [isOdemePlaniGosterDisable, setIsOdemePlaniGosterDisable] =
    useState(true);

  const isNumber = (event) => {
    if (event.which < 48 || event.which > 57) {
      event.preventDefault();
      return false;
    }
    return true;
  };

  useEffect(() => {
    setIsOdemePlaniGosterDisable(true);
  }, [creditAmount, installmentCount, interestRate, period]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //https://www.kredimodeli.com/makaleler/KrediHesaplama
    let bsmv = 0.1;
    let kkdf = 0.15;
    let interestRateWithTax = ((1 + bsmv + kkdf) * interestRate) / 100;
    let installmentAmount =
      creditAmount *
      ((interestRateWithTax *
        Math.pow(interestRateWithTax + 1, installmentCount)) /
        (Math.pow(1 + interestRateWithTax, installmentCount) - 1));

    let bsmvAmounts = [];
    let kkdfAmounts = [];
    let interestAmounts = [];
    let anaparas = [];
    let kalanAnaParas = [];
    let previousCreditAmount = creditAmount;

    for (let i = 1; i <= installmentCount; i++) {
      let interest =
        previousCreditAmount * (interestRate / 100) * (period / 30);
      let bsmvAmount = interest * bsmv;
      let kkdfAmount = interest * kkdf;
      let anapara = installmentAmount - interest - bsmvAmount - kkdfAmount;
      let kalanAnaPara = previousCreditAmount - anapara;
      previousCreditAmount = kalanAnaPara;

      bsmvAmounts.push(bsmvAmount);
      kkdfAmounts.push(kkdfAmount);
      interestAmounts.push(interest);
      anaparas.push(anapara);
      kalanAnaParas.push(previousCreditAmount);
    }

    console.log("Aylık Taksit Tutarı", installmentAmount);
    console.log("Anapara Tutarı", anaparas);
    console.log("Kalan Anapara Tutarı", kalanAnaParas);
    console.log("Kar Tutarı", interestAmounts);
    console.log("BSMV Tutarı", bsmvAmounts);
    console.log("KKDF Tutarı", kkdfAmounts);

  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <label>
            Kredi Tutarı :
            <input
              type="decimal"
              value={creditAmount}
              name="creditAmount"
              onKeyPress={(e) => isNumber(e)}
              onChange={(e) => setCreditAmount(e.target.value)}
              required
            />
          </label>
          <br></br>
          <label>
            {" "}
            Taksit Sayısı :
            <input
              type="number"
              value={installmentCount}
              name="installmentCount"
              onKeyPress={(e) => isNumber(e)}
              onChange={(e) => setInstallmentCount(e.target.value)}
              required
            />
          </label>
          <br></br>

          <label>
            {" "}
            Kar Oranı(%) :
            <input
              type="decimal"
              value={interestRate}
              name="interestRate"
              onChange={(e) => setInterestRate(e.target.value)}
              required
            />
          </label>
          <br></br>

          <label>
            {" "}
            Taksit Aralığı :
            <select
              type="combo"
              value={period}
              name="period"
              onChange={(e) => setPeriod(e.target.value)}
              required
            >
              <option value={7}>Haftalık</option>
              <option value={30}>Aylık</option>
              <option value={365}>Yıllık</option>
            </select>
          </label>
          <br></br>

          <button
            type="submit"
            onClick={() => setIsOdemePlaniGosterDisable(false)}
          >
            Hesapla
          </button>
        </div>
      </form>
      <button disabled={isOdemePlaniGosterDisable}>Ödeme Planını Göster</button>
    </div>
  );
};

export { CreditCalculateForm };
