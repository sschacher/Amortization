export default function reducer(state, action) {
  switch (action.type) {
    case "CLEAR_AMORT":
      return {
        ...state,
        term: "",
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
    case "CALCULATE_AMORT":
      return {
        ...state,
        term: action.payload.term,
        basicData: {
          labels: action.payload.labels,
          datasets: [
            {
              label: "Principle",
              data: action.payload.principlePoints,
              fill: true,
              borderColor: "#7FFF00",
            },
            {
              label: "Interest",
              data: action.payload.interestPoints,
              fill: true,
              borderColor: "#DC143C",
            },
            {
              label: "Total Amount Paid",
              data: action.payload.totalPoints,
              fill: false,
              borderColor: "#ADD8E6",
            },
          ],
        },
      };
    default:
      return state;
  }
}
