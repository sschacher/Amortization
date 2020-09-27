import React, { useState, Fragment, useContext, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { stateContext } from "../App";
import { CalculatePayment, CalculateAmortTable } from "../Func/functions";

export default function InputGrouping() {
  const context = useContext(stateContext);

  const [labels, setLabels] = useState([]);
  const [principle, setPrinciple] = useState("");
  const [interest, setInterest] = useState("");
  const [term, setTerm] = useState("");
  const [amort, setAmort] = useState("");
  const [payment, setPayment] = useState("");
  const [down, setDown] = useState("");
  const [purchase, setPurchase] = useState("");

  function onSubmit() {
    setLabels([]);
    context.dispatch({ type: "CLEAR_AMORT" });
    let pay = CalculatePayment(principle, interest, amort);
    setPayment(pay);
    for (let i = 0; i < amort + 1; i++) {
      labels.push(`Year: ${i}`);
    }
    let { principlePoints, interestPoints, totalPoints } = CalculateAmortTable(
      principle,
      interest,
      amort,
      pay
    );
    context.dispatch({
      type: "CALCULATE_AMORT",
      payload: {
        term,
        principle,
        interestPoints,
        principlePoints,
        totalPoints,
        amort,
        labels,
      },
    });
  }

  useEffect(() => {
    setPrinciple(purchase - down);
  }, [purchase, down]);

  return (
    <Fragment>
      <div className="p-grid p-mt-1">
        <div className="p-col-12 p-md-6 p-lg-3">
          <InputText
            value={purchase}
            placeholder="Purchase Price"
            onChange={(e) => setPurchase(Number(e.target.value))}
          />
        </div>
        <div className="p-col-12 p-md-6 p-lg-3">
          <InputText
            value={down}
            placeholder="Down Payment"
            onChange={(e) => setDown(Number(e.target.value))}
          />
        </div>
        <div className="p-col-12 p-md-6 p-lg-3">
          <InputText
            value={interest}
            placeholder="Interest"
            onChange={(e) => setInterest(e.target.value)}
          />
        </div>
        <div className="p-col-12 p-md-6 p-lg-3">
          <InputText
            value={term}
            placeholder="Term Length"
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        <div className="p-col-12 p-md-6 p-lg-3">
          <InputText
            value={amort}
            placeholder="Amortization Length"
            onChange={(e) => setAmort(Number(e.target.value))}
          />
        </div>
        <div className="p-col-12 p-md-6 p-lg-3">
          <InputText
            value={principle}
            placeholder="Principle Amount"
            disabled={true}
          />
        </div>
        <div className="p-col-12 p-md-6 p-lg-3">
          <InputText
            value={payment}
            disabled={true}
            placeholder="Payment Amount"
          />
        </div>
        <div className="p-col-12 p-md-6 p-lg-3">
          <Button
            className="p-justify-center p-button"
            label="Calculate Payment"
            onClick={onSubmit}
          />
        </div>
      </div>
    </Fragment>
  );
}
