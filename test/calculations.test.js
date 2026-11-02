'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const c = require('../lib/calculations');
test('pulse counts convert using the meter calibration', () => {
  assert.deepEqual(c.volume(120, 0.5), { litres: 60 });
});
test('flow rate handles intervals without divide-by-zero', () => {
  assert.deepEqual(c.flowRate(18, 6), { litres_per_minute: 3 });
  assert.throws(() => c.flowRate(18, 0));
});
test('water price is converted from cubic metres to litres', () => {
  assert.deepEqual(c.waterCost(500, 2.4), { estimated_cost: 1.2 });
});
test('threshold cards compare measured values and reject bad input', () => {
  assert.equal(c.flowAbove(20, 4, 5), true);
  assert.equal(c.usageAbove(500, 500), true);
  assert.throws(() => c.volume(1.5, 1));
});
