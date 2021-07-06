const Base64 = require('./Base64.js');

function getPolicyEncode(policy) {
  const encodedPolicy = Base64.encode(JSON.stringify(policy));
  return encodedPolicy;
}

module.exports = getPolicyEncode;