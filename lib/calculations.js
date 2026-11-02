'use strict';
function nonNegative(value, name) {
  if (!Number.isFinite(value) || value < 0) throw new Error(`${name} must be a non-negative number.`);
  return value;
}
function positive(value, name) {
  nonNegative(value, name);
  if (value === 0) throw new Error(`${name} must be greater than zero.`);
  return value;
}
function volume(pulses, litresPerPulse) {
  nonNegative(pulses, 'Pulse count');
  if (!Number.isInteger(pulses)) throw new Error('Pulse count must be a whole number.');
  return { litres: pulses * positive(litresPerPulse, 'Litres per pulse') };
}
function flowRate(litres, minutes) {
  return { litres_per_minute: nonNegative(litres, 'Water volume') / positive(minutes, 'Interval') };
}
function waterCost(litres, pricePerM3) {
  nonNegative(litres, 'Water volume');
  nonNegative(pricePerM3, 'Price per cubic metre');
  return { estimated_cost: litres * pricePerM3 / 1000 };
}
function flowAbove(litres, minutes, thresholdLpm) {
  nonNegative(thresholdLpm, 'Flow threshold');
  return flowRate(litres, minutes).litres_per_minute >= thresholdLpm;
}
function usageAbove(litres, limitLitres) {
  return nonNegative(litres, 'Water usage') >= nonNegative(limitLitres, 'Usage limit');
}
module.exports = { volume, flowRate, waterCost, flowAbove, usageAbove };
