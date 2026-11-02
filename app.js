'use strict';
const Homey = require('homey');
const calculations = require('./lib/calculations');

class App extends Homey.App {
  async onInit() {
    this.homey.flow.getActionCard('convert_pulses')
      .registerRunListener(async args => calculations.volume(args.pulses, args.litres_per_pulse));
    this.homey.flow.getActionCard('calculate_flow')
      .registerRunListener(async args => calculations.flowRate(args.litres, args.minutes));
    this.homey.flow.getActionCard('estimate_cost')
      .registerRunListener(async args => calculations.waterCost(args.litres, args.price_per_m3));
    this.homey.flow.getConditionCard('flow_above')
      .registerRunListener(async args => calculations.flowAbove(args.litres, args.minutes, args.threshold_lpm));
    this.homey.flow.getConditionCard('usage_above')
      .registerRunListener(async args => calculations.usageAbove(args.litres, args.limit_litres));
  }
}

module.exports = App;
