import React, { useReducer, createContext, useState } from "react";
import reducer from "./Reducer/reducer";

import "./App.scss";
import "primeflex/primeflex.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import MortgageAmortTable from "./Components/MortgageAmortTable";
import Table from "./Components/Table";
import InputGrouping from "./Components/InputGrouping";

const initialState = {
  basicData: {
    labels: [],
    datasets: [
      {
        label: "Principle",
        data: [],
        fill: true,
        borderColor: "#7FFF00",
      },
      {
        label: "Interest",
        data: [],
        fill: true,
        borderColor: "#DC143C",
      },
      {
        label: "Total Amount Paid",
        data: [],
        fill: true,
        borderColor: "#ADD8E6",
      },
    ],
  },
};

const buttonStyle = {
  display: "flex",
  height: "52px",
  width: "100px",
  top: "120px",
  overflow: "hidden",
  textAlign: "center",
  zIndex: "1",
  position: "absolute",
};

export const stateContext = createContext(initialState);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [visible, setVisible] = useState(false);

  return (
    <stateContext.Provider value={{ state: state, dispatch: dispatch }}>
      <div className="App">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {state.basicData.labels.length === 0 ? (
            <Button
              label="Table"
              icon="pi pi-table"
              disabled
              style={buttonStyle}
            />
          ) : (
            <Button
              label="Table"
              icon="pi pi-table"
              onClick={() => setVisible(true)}
              style={buttonStyle}
            />
          )}
        </div>
        <div style={{ width: "90vw", margin: "auto", marginTop: "0" }}>
          <InputGrouping />
        </div>
        <div style={{ width: "90vw", margin: "auto", marginTop: "0" }}>
          <MortgageAmortTable />
        </div>
        {state.basicData.labels.length === 0 ? (
          ""
        ) : (
          <Sidebar
            visible={visible}
            position="right"
            onHide={() => setVisible(false)}
          >
            <Table />
          </Sidebar>
        )}
      </div>
    </stateContext.Provider>
  );
}

export default App;
