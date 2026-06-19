const paypal = require("@paypal/checkout-server-sdk");

const env = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET
);

const client = new paypal.core.PayPalHttpClient(env);

async function createPayment(amount) {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [{
      amount: { currency_code: "USD", value: amount }
    }]
  });

  const response = await client.execute(request);
  return response.result;
}

module.exports = { createPayment };
