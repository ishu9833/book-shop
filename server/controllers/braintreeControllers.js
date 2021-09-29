const User = require("../models/userSchema");
const braintree = require("braintree");
const { get } = require("lodash");
require("dotenv").config();

var gateway = new braintree.BraintreeGateway({
    environment:  braintree.Environment.Sandbox,
    merchantId:   'd2z5pcz3p6fhztvs',
    publicKey:    '78x6z47r7j6vsgyg',
    privateKey:   'aa57d5dcdaadb6de8ed7dc051f543c0f'
});

exports.generateToken = async (req, res) => {
    gateway.clientToken
    .generate({})
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => res.status(500).send(err));
};


exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  // charge
  let newTransaction = gateway.transaction.sale(
      {
          amount: amountFromTheClient,
          paymentMethodNonce: nonceFromTheClient,
          options: {
              submitForSettlement: true
          }
      },
      (error, result) => {
          if (error) {
              res.status(500).json(error);
          } else {
              res.json(result);
          }
      }
  );
};