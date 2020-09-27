import React, { Fragment, useContext } from "react";
import { stateContext } from "../App";
import { Accordion, AccordionTab } from "primereact/accordion";
import { ScrollPanel } from "primereact/scrollpanel";

export default function Table() {
  const context = useContext(stateContext);
  const { labels, datasets } = context.state.basicData;
  return (
    <Fragment>
      <ScrollPanel
        style={{ width: "100%", height: "575px" }}
        className="custom"
      >
        <Accordion multiple>
          {labels.map((labels, idx) => (
            <AccordionTab
              key={idx}
              header={labels}
              activeIndex={context.state.term}
            >
              Principle Amount Left: ${datasets[0].data[idx]}
              <br />
              Total Interest paid: ${datasets[1].data[idx]}
              <br />
              {context.state.term === idx ? "Your term ends this year" : ""}
            </AccordionTab>
          ))}
        </Accordion>
      </ScrollPanel>
    </Fragment>
  );
}
