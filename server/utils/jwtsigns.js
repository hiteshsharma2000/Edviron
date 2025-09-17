const jwt = require("jsonwebtoken");
require('dotenv').config()

function signPayload(payload) {
    console.log(process.env.PAYMENT_PG_KEY);
    
  return jwt.sign(payload, process.env.PAYMENT_PG_KEY); 
}

module.exports = { signPayload };
