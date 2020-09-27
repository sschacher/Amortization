import React, { useContext } from "react";
import { Chart } from "primereact/chart";
import { stateContext } from "../App";

export default function MortgageAmortTable() {
  const context = useContext(stateContext);
  return (
    <div>
      <div className="card">
        <h5>Amortization Graph</h5>
        <Chart type="line" data={context.state.basicData} />
      </div>
    </div>
  );
}
