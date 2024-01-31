export const currencyFormat = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

//return new Intl.NumberFormat("es-PE", {   //Sol - Perú
// currency: "PEN",

/* 
// format number to US dollar
let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// format number to British pounds
let pounds = Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
});

// format number to Indian rupee
let rupee = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

// format number to Euro
let euro = Intl.NumberFormat('en-DE', {
  style: 'currency',
  currency: 'EUR',
});

console.log('Dollars: ' + USDollar.format(price));
// Dollars: $143,450.00

console.log(`Pounds: ${pounds.format(price)}`);
// Pounds: £143,450.00

console.log('Rupees: ' + rupee.format(price));
// Rupees: ₹1,43,450.00

console.log(`Euro: ${euro.format(price)}`);
// Euro: €143,450.00 
*/
