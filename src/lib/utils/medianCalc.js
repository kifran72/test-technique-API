const _ = require("lodash");

const medianCalc = (arr) => {
  const mid = _.floor(arr.length / 2),
    nums = _.sortBy([...arr]);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

module.exports = { medianCalc };
