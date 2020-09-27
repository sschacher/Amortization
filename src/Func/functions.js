export function CalculatePayment(principle, interest, amort) {
  // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
  let p = Number(principle);
  let i = Number(interest);
  let apr = Number(i) / 100;
  let q = 1 + apr / 2;
  let u = Math.pow(q, 1 / 6) - 1;
  let n = Number(amort);
  let t = Number(n) * 12;
  let z = 1 + u;
  let b = u * Math.pow(z, t);
  let c = Math.pow(z, t) - 1;
  let pay = p * (b / c);
  return pay;
}

export function CalculateAmortTable(principle, interest, amort, pay) {
  let p = Number(principle);
  let i = Number(interest);
  let apr = Number(i) / 100;
  let q = 1 + apr / 2;
  let u = Math.pow(q, 1 / 6) - 1;
  let n = Number(amort);
  let t = Number(n) * 12;
  const principlePoints = [];
  const allInterest = [];
  const interestPoints = [];
  const total = [];
  const totalPoints = [];

  for (let i = 0; i < t + 1; i++) {
    var sum = allInterest.reduce(function (a, b) {
      return a + b;
    }, 0);
    var paymentSum = total.reduce(function (a, b) {
      return a + b;
    }, 0);
    let oldPrince = p;
    let intComp = u * oldPrince;
    let princeOnly = pay - intComp;
    let newPrince = oldPrince - princeOnly;
    if (i === 0 || i % 12 === 0) {
      interestPoints.push(Math.round(sum));
      if (oldPrince <= 0) {
        oldPrince = 0;
        principlePoints.push(Math.round(oldPrince));
      } else {
        principlePoints.push(Math.round(oldPrince));
      }
      totalPoints.push(Math.round(paymentSum));
    }
    total.push(Math.round(pay));
    allInterest.push(Math.round(intComp));

    p = newPrince;
  }
  return { principlePoints, interestPoints, totalPoints };
}
